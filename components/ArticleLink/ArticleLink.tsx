import React from 'react'
import {ArticleLinkProp} from './ArticleLink.types'
import Link from "next/link";
import {FiChevronsRight, FiChevronsLeft} from 'react-icons/fi'


const ArticleLink = ({article, position}: ArticleLinkProp) => {
    const linkUrl = `/articles/${encodeURIComponent(article.slug)}`
    return <div className="w-auto max-w-xs flex justify-center">
        <Link href={linkUrl}>
            <div
                className={`group flex w-full w-72 md:w-96 h-20 mt-5 md:mt-0 cursor-pointer transition-shadow duration-300 drop-shadow-xl hover:shadow-xl bg-white rounded-lg flex items-center ${position == 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div
                    className={`bg-black h-full flex grow w-16 text-white text-4xl cursor-pointer items-center justify-center ${position == 'left' ? 'rounded-l-lg' : 'rounded-r-lg'}`}>
                    {position == 'left' && <FiChevronsLeft className="group-hover:scale-150 transform duration-150"/>}
                    {position == 'right' && <FiChevronsRight className="group-hover:scale-150 transform duration-150"/>}
                </div>
                <div className="px-5 line-clamp-2 text-sm text-center w-2/3 flex grow ">
                    {article.title}
                </div>
            </div>
        </Link>
    </div>
}

export default ArticleLink