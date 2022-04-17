import React, {useCallback, useEffect, useState} from 'react'
import {PortableTextComponent} from "@portabletext/react";
import Image from "next/image";
import sanity, {GetImageQuery} from "@libs/sanity";
import {IArticleImage} from "@local-types/article";


export interface ImageBlock {
    _type: 'image'
    asset: {
        _ref: string,
        _type: string
    }
}

export const RichtextImage: PortableTextComponent<ImageBlock> = ({value}) => {
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState<IArticleImage|null>(null)
    const loadImage = useCallback(async () => {
        const response = await sanity.query({
            query: GetImageQuery,
            variables: {id: value.asset._ref}
        });
        if (response) {
            const {data: {SanityImageAsset: {title, url, altText, description}}} = response
            setImage({title, url, description, alt: altText})
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        loadImage()
    }, [])

    return <>
        {loading && <div>Loading...</div>}
        {!loading && image && <>
            <img src={image.url}
                 title={image.title}
                 alt={image.alt}/>
            {image.description && <span className="text-xs text-gray-500 text-center mt-2">{image.description}</span>}
        </>}
        {!loading && !image && <div>Loading...</div>}
    </>
}