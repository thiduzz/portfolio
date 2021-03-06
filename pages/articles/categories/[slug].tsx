import type {InferGetStaticPropsType} from 'next'
import Layout from "@components/Layout";
import React, {useCallback, useState} from "react";
import sanity, {
    GetAllCategoriesIndexQuery,
    GetAllPostByCategoryQuery,
    GetSpecificCategoryBySlugQuery
} from "@libs/sanity";
import {
    IArticle,
    IArticleCategory, IArticleListItemResponse, IArticleListReponse,
} from "@local-types/article";
import {transformArticle} from "@libs/utils";
import LoadMoreButton from "@components/LoadMoreButton/LoadMoreButton";
import {dayjsFormatted} from "@libs/day";
import StandardHead from "@components/StandardHead/StandardHead";
import ArticleList from "@components/ArticleList/ArticleList";
import ArticleHeader from "@components/ArticleHeader/ArticleHeader";

const PAGINATION_LIMIT = 4;

const loadCategoryPosts = async (category: IArticleCategory, offset: number): Promise<IArticleListReponse>  => {
    const response = await sanity.query({
        query: GetAllPostByCategoryQuery,
        variables: {
            id: category.id,
            offset,
            limit: PAGINATION_LIMIT + 1
        }
    });
    let loadedArticles = [ ... (response.data.allPost ?? []) ] as Array<IArticleListItemResponse>
    if (loadedArticles && loadedArticles.length > 0) {
        const transformedArticles: Array<IArticle> = loadedArticles.map(transformArticle)
        const poppedItem = transformedArticles.length > PAGINATION_LIMIT && transformedArticles.pop()
        const hasMore = (poppedItem !== undefined && poppedItem !== false)
        return {loadedCategory: category, loadedHasMore: hasMore, loadedArticles: transformedArticles}
    }
    return {loadedCategory: category, loadedHasMore: false, loadedArticles: []}
}

const Category = ({preloadedCategory, preloadedArticles, preloadedHasMore}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const categoryDetail: IArticleCategory = preloadedCategory
    const [articles, setArticles] = useState<Array<IArticle>>(preloadedArticles)
    const [offset, setOffset] = useState<number>((preloadedArticles as Array<IArticle>).length)
    const [loading, setLoading] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(preloadedHasMore)
    const handlePagination = useCallback(async () => {
        setLoading(true)
        const {loadedHasMore, loadedArticles} = await loadCategoryPosts(categoryDetail, offset)
        setHasMore(loadedHasMore)
        setArticles([...articles, ...loadedArticles])
        setOffset(loadedArticles.length + offset)
        setLoading(false)
    },[articles, categoryDetail, offset])

    // @ts-ignore
    const ogPublishedDate = articles && articles[0] ? dayjsFormatted(articles[0].publishedAt).toISOString() : undefined
    const ogImage = articles && articles[0] ? articles[0].image?.url : undefined
    const ogCategory = categoryDetail.description ?? `Collection of Articles related to the category ${categoryDetail.title} -  `
    return (
        <Layout>
            <StandardHead title={`Articles - ${categoryDetail.title} - Thiago Mello`} description={ogCategory} updatedAt={ogPublishedDate} image={ogImage}/>
            <div className="page-content justify-start">
                <div className="my-10 w-full">
                    <ArticleHeader label="Category" title={`${categoryDetail.title ?? 'CategoryNotFound'}`} description={categoryDetail.description}/>
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
        query: GetAllCategoriesIndexQuery,
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

export async function getStaticProps({params}) {
    const {slug} = params

    const resultCategory = await sanity.query({
        query: GetSpecificCategoryBySlugQuery,
        variables: {slug}
    });
    const {data: {allCategory: categories}} = resultCategory
    if(categories && categories.length > 0){
        const category = {slug, title: categories[0].title, id: categories[0]._id, description: categories[0].description}
        const {loadedHasMore, loadedArticles} = await loadCategoryPosts(category, 0)
        return {props: { preloadedArticles : loadedArticles ? loadedArticles as Array<IArticle> : [], preloadedCategory: category, preloadedHasMore: loadedHasMore }, revalidate: true}
    }
    return {props: {}, revalidate: true, notFound: true}
}


export default Category
