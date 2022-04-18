import type { NextPage } from 'next'
import Layout from "@components/Layout";
import React from "react";
import StandardHead from "@components/StandardHead/StandardHead";

const About: NextPage = () => {
  return (
      <Layout>
        <StandardHead title="Thiago Mello - Contact" description="Contact me through any of the channels listed above - let's collaborate!"/>
        <div className="page-content">
            <div className="my-10 flex justify-center md:justify-start w-full">
                <h1 className="text-3xl text-left">Contact me...</h1>
            </div>
        </div>
      </Layout>
  )
}

export default About
