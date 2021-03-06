import {ApolloClient, gql, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SANITY_GRAPHQL_URL,
    cache: new InMemoryCache(),
    connectToDevTools: true
});

export const GetImageQuery = gql`
    query GetImage($id: ID!) {
      SanityImageAsset(id: $id){
        _id,
        title,
        description,
        url,
        altText
      }
    }
`;

export default client

export const GetAllPostIndexQuery = gql`
    query GetAllPosts {
        allPost(sort: [{ publishedAt: DESC } ]){
            title,
            slug {
                current
            },
            excerpt,
            publishedAt,
            _updatedAt
        }
    }
`;

export const GetAllCategoriesIndexQuery = gql`
    query GetAllCategories {
        allCategory{
            _id,
            slug {
                current
            }
        }
    }
`;

export const GetAllTagsIndexQuery = gql`
    query GetAllTags {
        allTag{
            _id,
            slug {
                current
            }
        }
    }
`;

export const GetAllPostsQuery = gql`
            query ListPosts($limit: Int, $offset: Int){
                allPost(limit: $limit, offset: $offset, sort: [{ publishedAt: DESC } ]){
                    _id,
                    title,
                    excerpt,
                    slug {
                        current
                    },
                    mainImage{
                        asset{
                            url,
                            title,
                            description,
                            altText
                        }
                    },
                    publishedAt
                }
            }
`;

export const GetAllPostByCategoryQuery = gql`
    query GetAllPostByCategorySlug($id: ID, $limit: Int, $offset: Int) {
          allPost(limit: $limit, offset: $offset, sort: [{ publishedAt: DESC } ], where: { _: { references: $id } }) {
                    _id,
                    title,
                    excerpt,
                    slug {
                        current
                    },
                    mainImage{
                        asset{
                            url,
                            title,
                            description,
                            altText
                        }
                    },
                    publishedAt
          }
    }
`;

export const GetAllPostByTagQuery = gql`
    query GetAllPostByTagSlug($id: ID, $limit: Int, $offset: Int) {
          allPost(limit: $limit, offset: $offset, sort: [{ publishedAt: DESC } ], where: { _: { references: $id } }) {
                    _id,
                    title,
                    excerpt,
                    slug {
                        current
                    },
                    mainImage{
                        asset{
                            url,
                            title,
                            description,
                            altText
                        }
                    },
                    publishedAt
          }
    }
`;

export const GetPostBySlugQuery = gql`
    query getPageBySlug($slug: String) {
      allPost(where: { slug: { current: { eq: $slug } } }) {
        _id,
        title,
        excerpt,
        mainImage{
            asset{
                url,
                title,
                description,
                altText
            }
        },
        isMarkdown,
        bodyMarkdown,
        bodyRichtextRaw,
        slug {
          current
        },
        tags {
            title,            
            slug {
                current
            }
        },
        categories {
            title,
            slug {
                current
            }
        },        
        previousPost {
          title,
          slug{
            current
          },
        },
        nextPost {
          title,
          slug{
            current
          },
        },
        publishedAt
      }
    }
`;

export const GetSpecificCategoryBySlugQuery = gql`
    query GetSpecificCategoryBySlug($slug: String) {
        allCategory(where: { slug: { current: { eq: $slug } } }){
            _id,
            title,
            description
        }
    }
`;

export const GetSpecificTagBySlugQuery = gql`
    query GetSpecificTagBySlug($slug: String) {
        allTag(where: { slug: { current: { eq: $slug } } }){
            _id,
            title
        }
    }
`;