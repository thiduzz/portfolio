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
            <div className="my-10 flex justify-center md:justify-start w-full">
                <h1 className="text-3xl text-left">About me...</h1>
            </div>
        </div>
      </Layout>
  )
}

export default About
