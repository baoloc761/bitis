import { gql } from "@apollo/client/core";

export const GET_BITIS_STORES = gql`
  query GetBitisStores {
    stores
      @rest(
        type: "BitisStoreResponse"
        path: "pages/get-data-store?view=data-store"
      ) {
      province_code
      district_code
      district
      province
      name
      address
      phone
      opening_hours
      lat
      lng
    }
  }
`;
