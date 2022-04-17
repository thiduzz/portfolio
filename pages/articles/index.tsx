import type {NextPage} from 'next'
import Layout from "../../components/Layout";
import Head from "next/head";
import React, {useCallback, useEffect, useState} from "react";
import {gql} from "@apollo/client";
import sanity from "../../lib/sanity";
import {IArticle, IArticleImage, IArticleListResponse} from "../../types/article";
import ArticleItem from "../../components/ArticleItem";

const Articles: NextPage = () => {
    const [articles, setArticles] = useState<Array<IArticle>>([])

    const loadArticles = useCallback(async () => {
        const response = await sanity.query({
            query: gql`
            query{
                allPost{
                    _id,
                    title,
                    excerpt,
                    slug {
                        current
                    },
                    mainImage{
                        asset{
                            url,
                            title,
                            description,
                            altText
                        }
                    },
                    publishedAt
                }
            }
      `,
        });
        if (response) {
            setArticles(response.data.allPost.map((item: IArticleListResponse) => {
                    let image: IArticleImage|null = null;
                    if(item.mainImage !== null){
                        image = {
                            url: item.mainImage.asset.url,
                            title: item.mainImage.asset.title,
                            description: item.mainImage.asset.description,
                            alt: item.mainImage.asset.title,
                        }
                    }
                    return {
                        id: item._id,
                        title: item.title,
                        slug: item.slug.current,
                        excerpt: item.excerpt,
                        image,
                        publishedAt: item.publishedAt ? new Date(item.publishedAt) : null
                    } as IArticle
                }
            ) as Array<IArticle>)
        }
    }, [])

    useEffect(() => {
        loadArticles()
    }, [])

    return (
        <Layout>
            <Head>
                <title>Thiago Mello - Articles</title>
                <meta name="description" content="Collection of articles and others"/>
                <link rel="icon" href="/public/favicon.ico"/>
            </Head>
            <div className="page-content">
                <div className="my-10">
                    <div className="flex justify-center md:justify-start w-full">
                        <h1 className="text-3xl text-left">Articles</h1>
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-4 justify-center mt-10">
                        {articles && articles.map((article) => <ArticleItem key={article.id} article={article}/>)}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Articles