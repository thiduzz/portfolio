import type {InferGetStaticPropsType} from 'next'
import Layout from "@components/Layout";
import React, {useCallback, useState} from "react";
import sanity, {
    GetAllPostByTagQuery,
    GetAllTagsQuery,
    GetSpecificTagBySlugQuery
} from "@libs/sanity";
import {
    IArticle,
    IArticleListItemResponse, IArticleListReponse, IArticleTag,
} from "@local-types/article";
import ArticleItem from "@components/ArticleItem";
import {transformArticle} from "@libs/utils";
import LoadMoreButton from "@components/LoadMoreButton/LoadMoreButton";
import {dayjsFormatted} from "@libs/day";
import StandardHead from "@components/StandardHead/StandardHead";
import ArticleList from "@components/ArticleList/ArticleList";
import ArticleHeader from "@components/ArticleHeader/ArticleHeader";

const PAGINATION_LIMIT = 4;

const loadTagPosts = async (tag: IArticleTag, offset: number): Promise<IArticleListReponse>  => {
    const response = await sanity.query({
        query: GetAllPostByTagQuery,
        variables: {
            id: tag.id,
            offset,
            limit: PAGINATION_LIMIT + 1
        }
    });
    let loadedArticles = [ ... (response.data.allPost ?? []) ] as Array<IArticleListItemResponse>
    if (loadedArticles && loadedArticles.length > 0) {
        const transformedArticles: Array<IArticle> = loadedArticles.map(transformArticle)
        const poppedItem = transformedArticles.length > PAGINATION_LIMIT && transformedArticles.pop()
        const hasMore = (poppedItem !== undefined && poppedItem !== false)
        return {loadedTag: tag, loadedHasMore: hasMore, loadedArticles: transformedArticles}
    }
    return {loadedTag: tag, loadedHasMore: false, loadedArticles: []}
}

const Category = ({preloadedTag, preloadedArticles, preloadedHasMore}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const tagDetail: IArticleTag = preloadedTag
    const [articles, setArticles] = useState<Array<IArticle>>(preloadedArticles)
    const [offset, setOffset] = useState<number>((preloadedArticles as Array<IArticle>).length)
    const [loading, setLoading] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(preloadedHasMore)
    const handlePagination = useCallback(async () => {
        setLoading(true)
        const {loadedHasMore, loadedArticles} = await loadTagPosts(tagDetail, offset)
        setHasMore(loadedHasMore)
        setArticles([...articles, ...loadedArticles])
        setOffset(loadedArticles.length + offset)
        setLoading(false)
    },[articles, tagDetail, offset])

    // @ts-ignore
    const ogPublishedDate = articles && articles[0] ? dayjsFormatted(articles[0].publishedAt).toISOString() : undefined
    const ogImage = articles && articles[0] ? articles[0].image?.url : undefined
    return (
        <Layout>
            <StandardHead title={`Articles - #${tagDetail.title} - Thiago Mello`} description={`Collection of Articles related to the tag #${tagDetail.title}`} updatedAt={ogPublishedDate} image={ogImage}/>
            <div className="page-content justify-start">
                <div className="my-10 w-full">
                    <div className="flex justify-center md:justify-start w-full flex-row items-center">
                        <span className="text-xl">Tag:</span>
                        <h1 className="text-3xl text-left md:ml-5">#{tagDetail.title ?? ''}</h1>
                    </div>
                    <ArticleHeader label="Tag" title={`#${tagDetail.title ?? 'TagNotFound'}`}/>
                    <ArticleList articles={articles}/>
                    { hasMore && <div className="flex flex-row justify-center mt-10">
                        <LoadMoreButton onClick={handlePagination} loading={loading}>Load more</LoadMoreButton>
                    </div> }
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    let paths: Array<{ params: { slug: string } }> = []

    const result: any = await sanity.query({
        query: GetAllTagsQuery,
    });

    const {data: {allTag: tags}} = result

    if (tags) {
        paths = tags.map((category: { slug: { current: string }}) => {
            return {
                params: {slug: category.slug.current}
            }
        })
    }
    return {paths, fallback: 'blocking'}
}

export async function getStaticProps({params}) {
    const {slug} = params

    const resultTag = await sanity.query({
        query: GetSpecificTagBySlugQuery,
        variables: {slug}
    });

    const {data: {allTag: tags}} = resultTag

    if(tags && tags.length > 0){
        const tag = {slug, title: tags[0].title, id: tags[0]._id}
        const {loadedHasMore, loadedArticles} = await loadTagPosts(tag, 0)
        return {props: { preloadedArticles : loadedArticles ? loadedArticles as Array<IArticle> : [], preloadedTag: tag, preloadedHasMore: loadedHasMore }, revalidate: true}
    }
    return {props: {}, revalidate: true, notFound: true}
}


export default Category
