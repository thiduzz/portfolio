import React from 'react'
import Link from "next/link";
import {TagBadgeProp} from "@components/TagBadge/TagBadge.types";

const TagBadge = ({ tag }: TagBadgeProp) => {

    return <Link href={`/articles/tags/${encodeURIComponent(tag.slug)}`} passHref>
        <div className="p-1 px-5 bg-gray-900 text-white rounded-full text-xs cursor-pointer hover:scale-110 duration-300 hover:bg-green-500">#{tag.title}</div>
    </Link>
}

export default TagBadge