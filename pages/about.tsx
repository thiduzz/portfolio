import type { NextPage } from 'next'
import Layout from "../components/Layout";
import Head from "next/head";
import React from "react";

const About: NextPage = () => {
  return (
      <Layout>

        <Head>
          <title>Thiago Mello - About</title>
          <meta name="description" content="A little about me..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="page-content">
          <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            About me
          </h1>
        </div>
      </Layout>
  )
}

export default About
