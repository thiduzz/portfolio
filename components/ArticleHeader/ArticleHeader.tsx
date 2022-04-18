import React from 'react'
import {ArticleHeaderProp} from "@components/ArticleHeader/ArticleHeader.types";


const ArticleHeader = ({ label, title, description  }: ArticleHeaderProp) => {
    return <div className="flex justify-center md:justify-start w-full flex-col">
        <div className="flex justify-center md:justify-start w-full flex-row items-center">
            {label && <span className="text-xl">{label}:&nbsp;</span>}
            <h1 className={`text-3xl text-left ${label ? 'md:ml-5' : ''}`}>{title}</h1>
            <div className="dots" aria-hidden="true"></div>
        </div>
        {description && <h3 className="text-xl mt-4">{description}</h3>}
    </div>
}

export default ArticleHeader