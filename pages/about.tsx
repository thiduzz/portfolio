import type { NextPage } from 'next'
import Layout from "@components/Layout";
import React from "react";
import StandardHead from "@components/StandardHead/StandardHead";

const About: NextPage = () => {
  return (
      <Layout>
        <StandardHead title="Thiago Mello - About" description="Personal things and a bit of my story so far - including career, upbringing and a bit of my personality"/>
        <div className="page-content">
            <div className="my-10 flex justify-center md:justify-start w-full">
                <div className="dots" aria-hidden="true"></div>
                <h1 className="text-3xl text-left">About</h1>
            </div>
        </div>
      </Layout>
  )
}

export default About
