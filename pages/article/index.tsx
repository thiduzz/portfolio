import type { NextPage } from 'next'
import Layout from "../../components/Layout";
import Head from "next/head";
import React from "react";

const About: NextPage = () => {
  return (
      <Layout>

        <Head>
          <title>Thiago Mello - Articles</title>
          <meta name="description" content="Collection of articles and others" />
          <link rel="icon" href="/public/favicon.ico" />
        </Head>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Articles...
          </h1>
        </div>
      </Layout>
  )
}

export default About
