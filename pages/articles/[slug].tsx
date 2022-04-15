import type {InferGetStaticPropsType} from 'next'
import Layout from "../../components/Layout";
import Head from "next/head";
import React from "react";
import {gql} from "@apollo/client";
import sanity from "../../lib/sanity";
import {IArticle} from "../../types/article";

const GetAllPostBySlug = gql`
    query GetAllPostSlugs {
        allPost{
            slug {
                current
            }
        }
    }
`;

const GetPostBySlug = gql`
    query getPageBySlug($slug: String) {
      allPost(where: { slug: { current: { eq: $slug } } }) {
        _id,
        title,
        bodyRaw,
        slug {
          current
        }
      }
    }
`;

const Article = ({article}: InferGetStaticPropsType<typeof getStaticProps>) => {
    // @ts-ignore
    const {id, title} = article
    return (
        <Layout>
            <Head>
                <title>Thiago Mello - Articles</title>
                <meta name="description" content="Collection of articles and others"/>
                <link rel="icon" href="/public/favicon.ico"/>
            </Head>
            <div className="flex flex-col items-center justify-center h-screen">
                {id} <br/>
                {title}
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    let paths: Array<{ params: { slug: string } }> = []
    const result: any = await sanity.query({
        query: GetAllPostBySlug,
    });
    const {data: {allPost: articles}} = result
    if (articles) {
        console.log('indexing articles...')
        paths = articles.map((article: { slug: { current: string } }) => {
            console.log(article.slug.current)
            return {
                params: {slug: article.slug.current}
            }
        })
    }
    return {paths, fallback: 'blocking'}

}

// @ts-ignore
export async function getStaticProps({params}) {
    const {slug} = params
    const result = await sanity.query({
        query: GetPostBySlug,
        variables: {slug}
    });
    const {data: {allPost: articles}} = result
    if(articles.length > 0 ){
        return {
            props: {
                article: {
                    id: articles[0]._id,
                    title: articles[0].title,
                    text: articles[0].bodyRaw,
                    slug: articles[0].slug.current
                } as IArticle
            },
            revalidate: 10,
        }
    }
    return {props: {}, revalidate: true, notFound: true}
}


export default Article
