import React from 'react'
import { ArticleItemProp } from './ArticleItem.types'
import Link from "next/link";
import Image from "next/image";
import {dayjsRelative} from "@libs/day";



const ArticleItem = ({ article }: ArticleItemProp) => {
    const imageUrl = article.image ? article.image.url : "/placeholder.jpeg"
    const linkUrl = `/articles/${encodeURIComponent(article.slug)}`
    // @ts-ignore
    const publishDateString = article.publishedAt ? dayjsRelative(article.publishedAt).fromNow() : null
    return <div className="article-wrapper">
            <div className="flex flex-col justify-start items-end bg-white rounded-md shadow-md w-full mb-5 md:mb-0">
                <Link href={linkUrl} passHref>
                <div className="relative shadow-2xl h-48 w-full rounded-t-md cursor-pointer">
                    <Image src={imageUrl} className="text-center m-0 p-0 w-full  rounded-t-md h-full object-cover object-center" layout="fill"/>
                </div>
                </Link>
                <div className="p-5 flex flex-col justify-around max-h-max">
                    <div className="grow">
                        <h3 className="text-lg line-clamp-3">{article.title}</h3>
                        <p className="line-clamp-4 mt-5">{article.excerpt}</p>
                    </div>
                    <div className="w-full text-sm text-green-500 mt-3">
                        <div className="flex flex-row justify-between w-full">
                            <Link href={linkUrl} passHref><button className="hover:underline hover:opacity-70 cursor-pointer">Read more...</button></Link>
                            {publishDateString && <span>{publishDateString}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
}

export default ArticleItem