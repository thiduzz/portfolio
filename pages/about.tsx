import type {NextPage} from 'next'
import Layout from "@components/Layout";
import React from "react";
import StandardHead from "@components/StandardHead/StandardHead";
import Link from "next/link";
import Image from "next/image";

const About: NextPage = () => {
    const mainImage = "https://cdn.sanity.io/images/qgimqc2y/portfolio/723359c857465c4d7548f3dc617c61ff3be341ce-4608x3456.jpg?fit=max&auto=format"

    const githubLink = process.env.NEXT_PUBLIC_GITHUB_PROFILE_LINK ?? '#'
    const linkedinLink = process.env.NEXT_PUBLIC_LINKEDIN_PROFILE_LINK ?? '#'
    return (
        <Layout>
            <StandardHead title="Thiago Mello - About" image={mainImage}
                          description="Personal things and a bit of my story so far - including career, upbringing and a bit of my personality"/>
            <div className="page-content">
                <div className="my-10 flex justify-center md:justify-start w-full">
                    <div className="dots" aria-hidden="true"></div>
                    <h1 className="text-3xl text-left">A little about me...</h1>
                </div>
                <div className="flex  flex-col md:flex-row">
                    <div className="w-full lg:w-1/3 flex items-center justify-start px-5 md:pt-24 lg:pt-5 flex-col">
                        <Image
                            src={mainImage}
                            className="rounded-md text-center m-0 p-0 w-full h-full object-cover object-center shadow-2xl"
                            alt="Thiago's Photo taken in Kyoto - Japan Picture" title="Thiago in Kyoto - Japan"
                            height="400" width="500"
                        />
                        <figcaption className="text-xs mt-2">Trip to Kyoto, Japan - 2019</figcaption>
                    </div>
                    <div className='w-full lg:w-2/3 px-5'>
                        <h2 className="lg:hidden my-5 text-2xl text-center underline underline-offset-8 decoration-double decoration-green-500">Personal</h2>
                        <p className="pt-5">
                            I am a Portuguese/Brazilian Software Engineer based in Berlin, Germany - and I currently
                            work at <Link href="https://www.smava.de" passHref><a target="_blank">smava</a></Link>. I was born and raised in the city
                            of <Link href="https://en.wikipedia.org/wiki/Curitiba">Curitiba, Brazil</Link> where I also
                            attended the <Link href="https://www.pucpr.br/cursos-graduacao/sistemas-de-informacao/" passHref><a target="_blank">Information
                            Systems Bachelor degree at PUC-PR</a></Link> and my post-graduation course in Embedded Systems
                            and Internet of Things at <Link href="https://www.up.edu.br/" passHref><a target="_blank">Positivo University
                            (UP)</a></Link>.
                        </p>
                        <p className="pt-5">
                            When I am not coding or studying a technology/programming language - you will find me
                            scavenging for Vinyls in Berlin's used Records stores, having an amazing third-wave coffee
                            in a place such as <Link href="https://bonanzacoffee.de/" passHref><a target="_blank">Bonanza Roastery</a></Link> or running
                            around with one of my cameras and taking photos of landscapes/abandoned places.
                        </p>
                        <p className="pt-5">
                            I already travelled to 37 countries and lived long-term in 3 of them — Brazil, Czech
                            Republic and Germany — and had some short periods of my life in Greece and the US. I think
                            that by expanding my own horizon and by discovering new realities, I can continuously be
                            able to rediscover and reinvent myself. And yes, Japan and Iceland are my all time favorite
                            countries!
                        </p>
                        <p className="pt-5">
                            My family is my strength and motivation - I couldn't be half of the man I am today and have
                            reached what I reached in my career and life if it wasn't for my amazing parents,
                            grand-parents and my sisters. I dearly miss them (in portuguese - saudades) and constantly
                            look forward to see them - which I am lucky to be able to do at least twice a year :)
                        </p>
                    </div>
                </div>


                <div className="flex flex-col md:flex-row mt-10">
                    <div className="w-full lg:w-2/3 px-5">
                        <h2 className="lg:hidden my-5 text-2xl text-center underline underline-offset-8 decoration-double decoration-green-500">Career
                            & Technology</h2>
                        <p className="pt-5">
                            I consider Golang and Javascript (ReactJS/Vue.js) as my main programming languages — I love
                            it! Prior to that I worked with PHP (Laravel), NodeJS and some other corporate languages
                            (SAS Base, ACL...). I also really enjoy doing DevOps, Cloud Engineering with Terraform, AWS
                            and Kubernetes. I see myself as a Solutions Engineer (<i>"give me a problem and I will find
                            a good solution"</i>) and trail my career as a Full-stack developer - a position which
                            enables me to traverse and learn the entire stack and have a full understanding of the
                            solution with a greater impact.
                        </p>
                        <p className="pt-5">
                            For the past months I've taken a really big interest in Blockchain, Decentralized networks
                            and dApps development, studying Rust and Solidity - the programming languages that power the
                            main blockchains - I am fascinated with the possibilities of Blockchain and I believe that
                            underneath the "noise" of cryptocurrencies it lies a technology that can definitely disrupt
                            society in the same level the Internet did in the 90's/2000's.
                        </p>
                        <p className="pt-5">
                            I tend to see and approach programming languages/technology as a means to an end — don't get
                            me wrong, they are really important and need to be taken seriously — but let's not confuse
                            the real purpose of it, which in my case, I believe it is to help, enable and unite people.
                        </p>
                        <p className="py-5">
                            You can find more information about of my career on <Link href={linkedinLink}
                                                                                      passHref><a target="_blank">LinkedIn</a></Link> or my CV
                            (<Link href="/docs/Thiago_Mello_CV.pdf" passHref><a target="_blank">download here</a></Link>)
                            and find some of my projects in <Link href={githubLink} passHref><a target="_blank">Github</a></Link>.
                        </p>
                    </div>
                    <div className='w-full lg:w-1/3 flex items-end justify-center px-5'>
                        <Image
                            src="https://cdn.sanity.io/images/qgimqc2y/portfolio/f7b9f3e9404ce427b1a763d5d0ea0f3001e8f0bf-1300x1392.png?w=2000&fit=max&auto=format"
                            className="text-center m-0 p-0 w-full h-full object-cover object-center shadow-2xl"
                            alt="Gophercized Thiago's" title="Thiago's Gopher"
                            height="300" width="300"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default About
