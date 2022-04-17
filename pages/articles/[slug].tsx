import type {InferGetStaticPropsType} from 'next'
import Layout from "@components/Layout";
import Head from "next/head";
import React from "react";
import sanity, {GetAllPostBySlugQuery, GetPostBySlugQuery} from "@libs/sanity";
import {
    IArticle,
    IArticleCategory,
    IArticleImage,
    IArticleResponse, IArticleTag
} from "@local-types/article";
import {PortableText} from "@portabletext/react";
import Image from "next/image";
import {dayjsFormatted} from "@libs/day";
import CategoryBadge from "@components/CategoryBadge/CategoryBadge";
import MarkdownContent from "@components/MarkdownContent/MardownContent";

const Article = ({article}: InferGetStaticPropsType<typeof getStaticProps>) => {
    // @ts-ignore
    const {id, title, excerpt, tags, image, content, publishedAt, categories  } = article as IArticle
    const imageUrl = image ? image.url : "/placeholder.jpeg"
    // @ts-ignore
    const publishedDate = dayjsFormatted(publishedAt).format('LL')
    return (
        <Layout>
            <Head>
                <title>Thiago Mello - Articles</title>
                <meta name="description" content={excerpt}/>
                <link rel="icon" href="/public/favicon.ico"/>
            </Head>
            <div className="page-content justify-start">
                <div className="container">
                    <div className="my-10 w-full flex flex-col items-center justify-center">
                        <div className="flex flex-col w-full h-full h-96">
                            <div className="relative flex flex-col grow w-full h-full  shadow-2xl rounded-xl">
                                <Image src={imageUrl} className="text-center m-0 p-0 w-full rounded-xl h-full object-cover object-center" layout="fill"/>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center md:justify-start w-full my-10">
                            <h1 className="text-3xl text-left mb-3">{title}</h1>
                            <span className="text-sm">{publishedDate}</span>
                            {categories && categories.length > 0 &&
                                <div className="mt-3 flex flex-row justify-center gap-3 flex-wrap">
                                    {categories.map((category) => (<CategoryBadge key={category.slug} category={category}></CategoryBadge>))}
                                </div>
                            }
                        </div>
                        <div className="flex flex-col container">
                            {content?.isMarkdown && !content.isMarkdown && <div className="richtext-content"><PortableText value={content?.body}/></div>}
                            {content?.isMarkdown && content.isMarkdown && <MarkdownContent>{content.body}</MarkdownContent>}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    let paths: Array<{ params: { slug: string } }> = []
    const result: any = await sanity.query({
        query: GetAllPostBySlugQuery,
    });
    const {data: {allPost: articles}} = result
    if (articles) {
        paths = articles.map((article: { slug: { current: string } }) => {
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
        query: GetPostBySlugQuery,
        variables: {slug}
    });
    const {data: {allPost: articles}} = result
    if(articles.length > 0 ){
        let image: IArticleImage|null = null;
        const article = articles[0] as IArticleResponse
        if(article){
            const {categories, tags } = article
            if(article.mainImage !== null){
                image = {
                    url: article.mainImage.asset.url,
                    title: article.mainImage.asset.title,
                    description: article.mainImage.asset.description,
                    alt: article.mainImage.asset.title,
                }
            }
            console.log(article)
            return {
                props: {
                    article: {
                        id: article._id,
                        title: article.title,
                        excerpt: article.excerpt,
                        slug: article.slug.current,
                        publishedAt: article.publishedAt,
                        content: {
                            isMarkdown: article.isMarkdown,
                            body: article.isMarkdown ? article.bodyMarkdown : article.bodyRichtextRaw
                        },
                        image,
                        categories: categories.map(({title, slug: {current}}) => { return {title, slug: current} as IArticleCategory }),
                        tags: tags.map(({title, slug: {current}}) => { return {title, slug: current} as IArticleTag })
                    } as IArticle
                },
                revalidate: 10,
            }
        }
    }
    return {props: {}, revalidate: true, notFound: true}
}


export default Article
