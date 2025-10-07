import { IBitisStore, IBitisStoreResponse } from "@/modal/types/BitisStore";
import { bitisClient } from "@/services/graphql/apollo.client";
import { GET_BITIS_STORES } from "@/services/graphql/queries/bitisStores.query";

export async function getBitisStores(): Promise<IBitisStore[]> {
  const { data } = await bitisClient.query<IBitisStoreResponse>({
    query: GET_BITIS_STORES,
    fetchPolicy: "no-cache",
  });

  return data?.stores ?? [];
}
