export interface IArticle {
    id: string
    title: string
    excerpt: string
    slug: string
    image?: IArticleImage
    publishedAt: Date
    content?: IArticleContent
    tags?: Array<string>
    categories?: Array<string>
}

export interface IArticleImage {
    title: string
    description: string
    alt: string
    url: string
}

export interface IArticleContent {
    isMarkdown: boolean
    markdown: string
    richtext: any
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