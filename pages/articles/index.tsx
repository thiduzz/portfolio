import Layout from "@components/Layout";
import React, {useCallback, useState} from "react";
import sanity, {GetAllPostsQuery} from "@libs/sanity";
import {IArticle, IArticleListItemResponse, IArticleListReponse} from "@local-types/article";
import {transformArticle} from "@libs/utils";
import {InferGetStaticPropsType} from "next";
import LoadMoreButton from "@components/LoadMoreButton/LoadMoreButton";
import StandardHead from "@components/StandardHead/StandardHead";
import {dayjsFormatted} from "@libs/day";
import ArticleList from "@components/ArticleList/ArticleList";
import ArticleHeader from "@components/ArticleHeader/ArticleHeader";

const PAGINATION_LIMIT = 4;


const loadPosts = async (offset: number): Promise<IArticleListReponse> => {
    const response = await sanity.query({
        query: GetAllPostsQuery,
        variables: {
            offset,
            limit: PAGINATION_LIMIT + 1
        }
    });
    let loadedArticles = [...(response.data.allPost ?? [])] as Array<IArticleListItemResponse>
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
    }, [articles, offset])

    // @ts-ignore
    const ogPublishedDate = articles && articles[0] ? dayjsFormatted(articles[0].publishedAt).toISOString() : undefined
    const ogImage = articles && articles[0] ? articles[0].image?.url : undefined
    return (
        <Layout>
            <StandardHead title="Thiago Mello - Articles"
                          description="Latest thoughts, discoveries on software development and other random stuff"
                          updatedAt={ogPublishedDate} image={ogImage}/>
            <div className="page-content justify-start">
                <div className="container max-w-4xl">
                    <div className="my-10 w-full">
                        <ArticleHeader title="Articles"/>
                        <ArticleList articles={articles}/>
                        {hasMore && <div className="flex flex-row justify-center mt-10">
                            <LoadMoreButton onClick={handlePagination} loading={loading}>Load more</LoadMoreButton>
                        </div>}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const {loadedHasMore, loadedArticles} = await loadPosts(0)
    return {
        props: {
            preloadedArticles: loadedArticles ? loadedArticles as Array<IArticle> : [],
            preloadedHasMore: loadedHasMore
        },
        revalidate: true
    }
}

export default Articles