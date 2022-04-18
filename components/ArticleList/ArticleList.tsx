import React from 'react'
import {ArticleListProp} from "@components/ArticleList/ArticleList.types";
import ArticleItem from "@components/ArticleItem";


const ArticleList = ({ articles }: ArticleListProp) => {
    return <>
        {articles && articles.length > 0 && <div className="md:grid md:grid-cols-2 md:gap-4 justify-center mt-10">
            {articles.map((article) => <ArticleItem key={article.id} article={article}/>)}
        </div>}
        {articles && articles.length <= 0 && <div className="justify-center mt-10">No articles to show :(</div>}
    </>
}

export default ArticleList