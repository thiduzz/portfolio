import type { NextPage } from 'next'
import Layout from "../../components/Layout";
import Head from "next/head";
import React, {useCallback, useEffect, useState} from "react";
import { gql } from "@apollo/client";
import sanity from "../../lib/sanity";
import {IArticle} from "../../types/article";
import Link from "next/link";

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
          setArticles(response.data.allPost.map((item: { _id: string; title: string; slug: { current: string } })=>({id: item._id, title: item.title, slug: item.slug.current})) as Array<IArticle>)
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
            {articles && articles.map((article) => (<Link key={article.id} href={`/articles/${encodeURIComponent(article.slug)}`} passHref><div>{article.title} - {article.slug}</div></Link>))}
        </div>
      </Layout>
  )
}

export default Articles