import type {NextPage} from 'next'
import Layout from "@components/Layout";
import React from "react";
import Link from "next/link";
import {FiGithub, FiLinkedin, FiMail, FiRss, FiTwitter} from "react-icons/fi";
import Image from "next/image";
import StandardHead from "@components/StandardHead/StandardHead";


const Home: NextPage = () => {

    const githubLink = process.env.NEXT_PUBLIC_GITHUB_PROFILE_LINK ?? '#'
    const linkedinLink = process.env.NEXT_PUBLIC_LINKEDIN_PROFILE_LINK ?? '#'
    const twitterlink = process.env.NEXT_PUBLIC_TWITTER_PROFILE_LINK ?? '#'
    const emailLink = process.env.NEXT_PUBLIC_EMAIL_LINK ?? '#'
    const rssLink = process.env.NEXT_PUBLIC_RSS_LINK ?? '#'

    return (
        <Layout>
            <StandardHead title="Thiago Mello - Homepage" description="Thoughts, discoveries on software development and other random stuff"/>
            <div className="page-content justify-center">
                <div className="hero flex flex-col items-center justify-center">
                    <div className="mb-10 flex">
                        <div className="bg-gray-900 border-8 border-gray-900 rounded-full relative shadow-2xl h-48 w-48">
                            <Image src="/images/profile.jpg" priority={true} alt="Thiago's Profile Picture" title="Profile Picture" className="rounded-full text-center m-0 p-0 w-full h-full object-cover object-center" layout="fill"/>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row justify-center mb-5 items-center">
                            <h1 className="text-5xl flex flex-row items-center justify-center flex-wrap md:flex-nowrap">
                                Hi, I&apos;m
                                <div className="rounded-xl mx-2 px-2 bg-gray-800 text-white mt-2 md:mt-0 leading-relaxed">Thiago</div>
                            </h1>
                        </div>
                        <div className="subtitle uppercase rounded-lg mx-2 mb-5 py-2 text-gray-800 flex gap-x-6 gap-y-4 md:gap-y-0 px-10 tracking-wide justify-center md:justify-between flex-wrap text-center">
                            <span>full-stack developer</span>
                            <span>solutions engineer</span>
                            <span>blockchain enthusiast</span>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-10 flex-wrap mb-10 md:mb-0">
                            <Link href={githubLink} passHref>
                                <a className="bg-gray-800 rounded-full p-6 flex flex-wrap cursor-pointer hover:scale-125 duration-300" target="_blank">
                                    <FiGithub className="text-white text-2xl"/>
                                </a>
                            </Link>
                            <Link href={linkedinLink} passHref>
                                <a className="bg-gray-800 rounded-full p-6 flex flex-wrap cursor-pointer hover:scale-125 duration-300" target="_blank">
                                    <FiLinkedin className="text-white text-2xl"/>
                                </a>
                            </Link>
                            <Link href={twitterlink} passHref>
                                <a className="bg-gray-800 rounded-full p-6 flex flex-wrap cursor-pointer hover:scale-125 duration-300" target="_blank">
                                    <FiTwitter className="text-white text-2xl"/>
                                </a>
                            </Link>
                            <a href={emailLink} target="_blank" rel="noreferrer">
                                <span className="bg-gray-800 rounded-full p-6 flex flex-wrap cursor-pointer hover:scale-125 duration-300">
                                    <FiMail className="text-white text-2xl"/>
                                </span>
                            </a>
                            <Link href={rssLink} passHref>
                                <a className="bg-gray-800 rounded-full p-6 flex flex-wrap cursor-pointer hover:scale-125 duration-300" target="_blank">
                                    <FiRss className="text-white text-2xl"/>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Home
