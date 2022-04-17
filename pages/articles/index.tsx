import Layout from "@components/Layout";
import Head from "next/head";
import React, {useCallback, useState} from "react";
import sanity, {GetAllPostsQuery} from "@libs/sanity";
import {IArticle, IArticleListItemResponse, IArticleListReponse} from "@local-types/article";
import ArticleItem from "@components/ArticleItem";
import {transformArticle} from "@libs/utils";
import {InferGetStaticPropsType} from "next";

const PAGINATION_LIMIT = 4;


const loadPosts = async (offset: number): Promise<IArticleListReponse>  => {
    const response = await sanity.query({
        query: GetAllPostsQuery,
        variables: {
            offset,
            limit: PAGINATION_LIMIT + 1
        }
    });
    let loadedArticles = [ ... (response.data.allPost ?? []) ] as Array<IArticleListItemResponse>
    if (loadedArticles && loadedArticles.length > 0) {
        const transformedArticles: Array<IArticle> = loadedArticles.map(transformArticle)
        const poppedItem = transformedArticles.length > PAGINATION_LIMIT && transformedArticles.pop()
        const hasMore = (poppedItem !== undefined && poppedItem !== false)
        return {loadedHasMore: hasMore, loadedArticles: transformedArticles}
    }
    return {loadedHasMore: false, loadedArticles: []}
}

const Articles = ({preloadedArticles, preloadedHasMore}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [articles, setArticles] = useState<Array<IArticle>>(preloadedArticles)
    const [offset, setOffset] = useState<number>((preloadedArticles as Array<IArticle>).length)
    const [loading, setLoading] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(preloadedHasMore)
    const handlePagination = useCallback(async () => {
        setLoading(true)
        const {loadedHasMore, loadedArticles} = await loadPosts(offset)
        setHasMore(loadedHasMore)
        setArticles([...articles, ...loadedArticles])
        setOffset(loadedArticles.length + offset)
        setLoading(false)
    },[])
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
                        <h1 className="text-3xl text-left">Articles</h1>
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-4 justify-center mt-10">
                        {articles && articles.map((article) => <ArticleItem key={article.id} article={article}/>)}
                        {loading && <div>Loading...</div>}
                    </div>
                    { hasMore && <div><button onClick={handlePagination}>Load more</button></div> }
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const {loadedHasMore, loadedArticles} = await loadPosts(0)
    return {
        props: {
            preloadedArticles : loadedArticles ? loadedArticles as Array<IArticle> : [],
            preloadedHasMore: loadedHasMore
        },
        revalidate: true
    }
}

export default Articles