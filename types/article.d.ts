import exp from "constants";

export interface IArticle {
    id: string
    title: string
    excerpt: string
    slug: string
    image?: IArticleImage
    publishedAt: Date|string
    content?: IArticleContent
    tags?: Array<IArticleTag>
    categories?: Array<IArticleCategory>
}

export interface IArticleTag {
    id: string
    title: string
    slug: string
}

export interface IArticleCategory {
    id: string
    title: string
    slug: string
    description?: string
}

export interface IArticleImage {
    title: string
    description: string
    alt: string
    url: string
}

export interface IArticleContent {
    isMarkdown: boolean
    body: any
}

export interface IArticleListResponse {
    _id: string;
    title: string;
    excerpt: string;
    slug: { current: string };
    mainImage: {
        asset: {
            url: string;
            title: string;
            description: string;
            altText: string;
        }
    }|null
    publishedAt: Date|null;
}

export interface IArticleResponse {
    _id: string;
    title: string;
    excerpt: string;
    slug: { current: string };
    mainImage: {
        asset: {
            url: string;
            title: string;
            description: string;
            altText: string;
        }
    }|null
    publishedAt: Date|null;
    isMarkdown: boolean;
    bodyMarkdown: string;
    bodyRichtextRaw: any;
    tags: Array<{ title: string; slug: { current: string }}>;
    categories: Array<{ title: string; slug: { current: string };}>;
}