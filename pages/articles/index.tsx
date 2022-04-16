import type { NextPage } from 'next'
import Layout from "../../components/Layout";
import Head from "next/head";
import React, {useCallback, useEffect, useState} from "react";
import { gql } from "@apollo/client";
import sanity from "../../lib/sanity";
import {IArticle} from "../../types/article";
import Link from "next/link";
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
                    slug {
                        current
                    }
                }
            }
      `,
      });
      if(response){
          setArticles(response.data.allPost.map(
              (item: { _id: string; title: string; slug: { current: string } }) => {
              return {id: item._id, title: item.title, slug: item.slug.current, }
             }
          ) as Array<IArticle>)
      }
  },[])



  useEffect(() => {
      loadArticles()
  },[])

  return (
      <Layout>
        <Head>
          <title>Thiago Mello - Articles</title>
          <meta name="description" content="Collection of articles and others" />
          <link rel="icon" href="/public/favicon.ico" />
        </Head>
        <div className="page-content">
            <div className="my-10">
                <div className="flex justify-center md:justify-start w-full">
                    <h1 className="text-3xl text-left">Articles</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center mt-10">
                    {articles && articles.map((article) => <ArticleItem key={article.id} article={article}/>)}
                </div>
            </div>
        </div>
      </Layout>
  )
}

export default Articles