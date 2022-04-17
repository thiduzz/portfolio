import {IArticle, IArticleImage, IArticleListItemResponse} from "@local-types/article";

export const transformArticle = (article: IArticleListItemResponse): IArticle => {
    let image: IArticleImage | null = null;
    if (article.mainImage !== null) {
        image = {
            url: article.mainImage.asset.url,
            title: article.mainImage.asset.title,
            description: article.mainImage.asset.description,
            alt: article.mainImage.asset.title,
        }
    }
    return {
        id: article._id,
        title: article.title,
        slug: article.slug.current,
        excerpt: article.excerpt,
        image,
        publishedAt: article.publishedAt ?? null
    } as IArticle
}