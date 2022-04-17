import type {InferGetStaticPropsType} from 'next'
import Layout from "@components/Layout";
import Head from "next/head";
import React from "react";
import sanity, {GetAllCategoriesQuery, GetAllPostByCategoryIdQuery, GetSpecificCategoryBySlugQuery} from "@libs/sanity";
import {
    IArticle, IArticleCategory,
    IArticleImage,
    IArticleListResponse,
} from "@local-types/article";
import ArticleItem from "@components/ArticleItem";


const Category = ({category, articles}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const articlesCategory: Array<IArticle> = articles
    const categoryDetail: IArticleCategory = category
    return (
        <Layout>
            <Head>
                <title>Thiago Mello - Articles</title>
                <meta name="description" content="Collection of articles and others"/>
                <link rel="icon" href="/public/favicon.ico"/>
            </Head>
            <div className="page-content justify-start">
                <div className="my-10 w-full">
                    <div className="flex justify-center md:justify-start w-full">
                        <h1 className="text-3xl text-left">Category: {categoryDetail.title ?? ''}</h1>
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-4 justify-center mt-10">
                        {articlesCategory && articlesCategory.map((article: IArticle) => <ArticleItem key={article.id} article={article}/>)}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    let paths: Array<{ params: { slug: string, id: string, title: string, description: string } }> = []
    const result: any = await sanity.query({
        query: GetAllCategoriesQuery,
    });
    const {data: {allCategory: categories}} = result
    if (categories) {
        paths = categories.map((category: { slug: { current: string }}) => {
            return {
                params: {slug: category.slug.current}
            }
        })
    }
    return {paths, fallback: 'blocking'}

}

// @ts-ignore
export async function getStaticProps({params}) {
    const {slug} = params

    const resultCategory = await sanity.query({
        query: GetSpecificCategoryBySlugQuery,
        variables: {slug}
    });
    const {data: {allCategory: categories}} = resultCategory
    if(categories && categories.length > 0){
        const category = {slug, title: categories[0].title, id: categories[0]._id, description: categories[0].description}
        const result = await sanity.query({
            query: GetAllPostByCategoryIdQuery,
            variables: {id: category.id}
        });
        const {data: {allPost: articles}} = result
        if (articles && articles.length > 0) {
            return {
                props: {
                    category,
                    articles: articles.map((item: IArticleListResponse) => {
                            let image: IArticleImage | null = null;
                            if (item.mainImage !== null) {
                                image = {
                                    url: item.mainImage.asset.url,
                                    title: item.mainImage.asset.title,
                                    description: item.mainImage.asset.description,
                                    alt: item.mainImage.asset.title,
                                }
                            }
                            console.log(item.publishedAt)
                            return {
                                id: item._id,
                                title: item.title,
                                slug: item.slug.current,
                                excerpt: item.excerpt,
                                image,
                                publishedAt: item.publishedAt ?? null
                            } as IArticle
                        }
                    ) as Array<IArticle>
                },
                revalidate: 10,
            }
        }
        return {props: { articles : [] as Array<IArticle>, category }, revalidate: true}
    }
    return {props: {}, revalidate: true, notFound: true}
}


export default Category
