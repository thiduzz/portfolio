import React from 'react';
import sanity, {GetAllCategoriesIndexQuery, GetAllPostIndexQuery, GetAllTagsIndexQuery} from "@libs/sanity";
import {dayjsFormatted, dayjsUTC} from "@libs/day";
import Head from "next/head";
import DefaultErrorPage from 'next/error';
import generateSitemap from "@libs/sitemap";
import generateRss from "@libs/rss";
import {IndexNode} from "@local-types/index";

const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN;

const getPostsSitemap = async (): Promise<Array<IndexNode>> => {
    const result: any = await sanity.query({
        query: GetAllPostIndexQuery,
    });
    const {data: {allPost: articles}} = result
    if (articles) {
        return articles.map((article: { slug: { current: string }, publishedAt: string, _updatedAt: string, title: string, excerpt: string }) => {
            return {
                title: article.title,
                excerpt: article.excerpt,
                url: `${BASE_URL}/articles/${article.slug.current}`,
                changeFrequency: 'weekly',
                // @ts-ignore
                lastUpdated: dayjsFormatted(article.publishedAt ?? article._updatedAt).toISOString(),
                // @ts-ignore
                lastUpdatedUTC: dayjsUTC(article.publishedAt ?? article._updatedAt).utc(),
                priority: "0.7"
            }
        })
    }
    return []
}

const getCategoriesSitemap = async (): Promise<Array<IndexNode>> => {
    const result: any = await sanity.query({
        query: GetAllCategoriesIndexQuery,
    });
    const {data: {allCategory: categories}} = result
    if (categories) {
        return categories.map((category: { slug: { current: string }}) => {
            return {
                url: `${BASE_URL}/articles/categories/${category.slug.current}`,
                changeFrequency: 'weekly',
                lastUpdated: new Date().toISOString(),
                priority: "0.5"
            }
        })
    }
    return []
}

const getTagsSitemap = async (): Promise<Array<IndexNode>> => {
    const result: any = await sanity.query({
        query: GetAllTagsIndexQuery,
    });
    const {data: {allTag: tags}} = result
    if (tags) {
        return tags.map((tag: { slug: { current: string }}) => {
            return {
                url: `${BASE_URL}/articles/tags/${tag.slug.current}`,
                changeFrequency: 'weekly',
                lastUpdated: new Date().toISOString(),
                priority: "0.5"
            }
        })
    }
    return []
}

const Dummy = () => (<>
    <Head>
        <meta name="robots" content="noindex" />
    </Head>
    <DefaultErrorPage statusCode={404} />
</>);

export async function getStaticProps() {

    const staticPaths: Array<IndexNode> = [
        {url: `${BASE_URL}`, changeFrequency: 'monthly', lastUpdated: new Date().toISOString(), priority: "1.0"},
        {url: `${BASE_URL}/about`, changeFrequency: 'monthly', lastUpdated: new Date().toISOString(), priority: "0.7"},
        {url: `${BASE_URL}/contact`, changeFrequency: 'monthly', lastUpdated: new Date().toISOString(), priority: "1.0"},
        {url: `${BASE_URL}/articles`, changeFrequency: 'daily', lastUpdated: new Date().toISOString(), priority: "0.8"},
    ]
    const postsPaths = await getPostsSitemap()
    const categoriesPaths = await getCategoriesSitemap()
    const tagsPaths = await getTagsSitemap()
    const allPaths =[ ...staticPaths , ...postsPaths, ...categoriesPaths, ...tagsPaths ];

    generateSitemap(allPaths)
    generateRss(postsPaths)
    return {
        props: {},
    };
};

export default Dummy;