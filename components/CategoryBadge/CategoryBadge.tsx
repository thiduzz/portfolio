import React from 'react'
import { CategoryBadgeProp } from './CategoryBadge.types'
import Link from "next/link";

const CategoryBadge = ({ category }: CategoryBadgeProp) => {

    return <Link href={`/articles/categories/${encodeURIComponent(category.slug)}`} passHref>
        <div className="p-2 px-5 bg-gray-900 text-white rounded-full text-sm cursor-pointer hover:scale-110 duration-300 hover:bg-green-500">{category.title}</div>
    </Link>
}

export default CategoryBadge