import { bitisClient } from "@/services/graphql/apollo.client";
import { GET_BITIS_PRODUCTS } from "@/services/graphql/queries/bitisProducts.query";
import { API_DEFAULT } from "@/constants/api";
import { IBitisProduct } from "@/modal/types/Products";

export async function getBitisProducts(
  collection: string,
  page: number = API_DEFAULT.PAGE,
  limit: number = API_DEFAULT.LIMIT
): Promise<IBitisProduct[]> {
  const { data } = await bitisClient.query<{ products: IBitisProduct[] }>({
    query: GET_BITIS_PRODUCTS,
    variables: { collection, page, limit },
    fetchPolicy: "no-cache",
  });

  return data?.products ?? [];
}
