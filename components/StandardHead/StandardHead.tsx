import React from "react";
import {StandardHeadProp} from "@components/StandardHead/StandardHead.types";
import Head from "next/head";


const StandardHead = ({children, title, image, updatedAt, description}: StandardHeadProp) => {
    const currentUrl = window.location.href
    const currentImage = image ?? '/public/og-image.png'
    return (<Head>
        <meta property="og:locale" content="en"/>
        <meta name="language" content="en"/>
        <meta name="application-name" content="Thiago Mello"/>
        <meta property="og:site_name" content="Thiago Mello"/>
        <link rel="canonical" href={currentUrl} itemProp="url"/>
        <meta name="url" content={currentUrl}/>
        <meta property="og:type" content="website"/>
        <meta property="og:article:author" content="Thiago Mello"/>
        <meta property="article:author" content="Thiago Mello"/>
        <meta name="author" content="Thiago Mello"/>
        <link rel="icon" href="/public/favicon.ico"/>

        <meta name="description" content={description}/>
        <meta property="og:title" content={title}/>
        <meta name="twitter:title" content={title}/>
        <meta itemProp="name" content={title}/>
        <meta itemProp="description"
              content={description}/>
        <meta property="og:description"
              content={description}/>
        <meta name="description"
              content={description}/>
        <meta name="twitter:description"
              content={description}/>
        <meta name="twitter:url" content={currentUrl} />
        <meta property="og:url" content={currentUrl} />

        {image && (
            <>
                <meta itemProp="image" content={currentImage}/>
                <meta property="og:image" content={currentImage}/>
                <meta name="twitter:image" content={currentImage}/>
                <meta name="twitter:image:src" content={currentImage}/>
                <meta name="twitter:card" content="summary_large_image"/>
            </>
        )}

        {updatedAt && <meta property="og:updated_time" content={updatedAt}/>}
        {children}
    </Head>)
}


export default StandardHead
