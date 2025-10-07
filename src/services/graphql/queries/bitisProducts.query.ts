import { gql } from "@apollo/client/core";

export const GET_BITIS_PRODUCTS = gql`
  query GetBitisProducts($collection: String!, $page: Int!, $limit: Int!) {
    products(
      collection: $collection
      page: $page
      limit: $limit
    )
      @rest(
        type: "BitisProductResponse"
        path: "collections/{args.collection}/products.json?include=metafields[product,hrvmultilang_en]&page={args.page}&limit={args.limit}"
      ) {
      id
      handle
      title
      product_type
      tags
      sole_quantity
      image
      images
      options
      variants
    }
  }
`;
