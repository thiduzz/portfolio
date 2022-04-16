import React from 'react'
import { ArticleItemProp } from './ArticleItem.types'
import Link from "next/link";
import Image from "next/image";


const ArticleItem = ({ article }: ArticleItemProp) => {
    return <Link href={`/articles/${encodeURIComponent(article.slug)}`} passHref>
        <div className="bg-white rounded-md shadow-md w-full">
            <div className="relative shadow-2xl h-48 w-full rounded-t-md">
                <Image src="/placeholder.jpeg" className="text-center m-0 p-0 w-full  rounded-t-md h-full object-cover object-center" layout="fill"/>
            </div>
            <div className="p-5">
                <h3 className="text-xl line-clamp-3">{article.title}</h3>
                <p className="line-clamp-2">{article.text}</p>
            </div>
        </div>
    </Link>
}

export default ArticleItem