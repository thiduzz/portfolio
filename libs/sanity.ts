import {ApolloClient, gql, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SANITY_GRAPHQL_URL,
    cache: new InMemoryCache(),
    connectToDevTools: true
});

export default client;

export const GetAllPostsQuery = gql`
            query{
                allPost(sort: [{ publishedAt: DESC } ]){
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

export const GetAllPostByCategoryIdQuery = gql`
    query GetAllPostByCategorySlug($id: ID) {
          allPost(sort: [{ publishedAt: DESC } ], where: { _: { references: $id } }) {
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