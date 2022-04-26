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
    previous?: ILinkedArticle
    next?: ILinkedArticle
}

export interface ILinkedArticle {
    title: string
    slug: string
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

export interface IArticleListReponse {
    loadedCategory?: IArticleCategory,
    loadedTag?: IArticleTag,
    loadedHasMore: boolean,
    loadedArticles: Array<IArticle>
}

export interface IArticleListItemResponse {
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

export interface IArticleLinkedResponse {
    title: string;
    slug: { current: string };
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
    previousPost: null|IArticleLinkedResponse;
    nextPost: null|IArticleLinkedResponse;
}