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

export const GetAllPostBySlugQuery = gql`
    query GetAllPostSlugs {
        allPost{
            slug {
                current
            }
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
        publishedAt
      }
    }
`;

export const GetAllCategoriesQuery = gql`
    query GetAllCategories {
        allCategory{
            _id,
            title,
            description,
            slug {
                current
            }
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