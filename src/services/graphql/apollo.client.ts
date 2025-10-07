import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  Observable,
  FetchResult,
  from,
} from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import { GraphQLError } from "graphql";

const API_BASE =
  process.env.NUXT_PUBLIC_BITIS_API_BASE || "https://bitis.com.vn";

const restFetchLink = new ApolloLink((operation, forward) => {
  return new Observable<FetchResult>((observer) => {
    const { collection, page, limit } = operation.variables as Record<
      string,
      string | number
    >;
    const url = `${API_BASE}/collections/${collection}/products.json?include=metafields[product,hrvmultilang_en]&page=${page}&limit=${limit}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => observer.next({ data }))
      .catch((err) => observer.error(err))
      .finally(() => observer.complete());
  });
});

const errorLink = onError((err) => {
  const { graphQLErrors, networkError } = err as {
    graphQLErrors?: readonly GraphQLError[];
    networkError?: Error;
  };

  if (graphQLErrors?.length) {
    graphQLErrors.forEach((e) =>
      console.warn(`[GraphQL error]: ${e.message}`)
    );
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError.message}`);
  }
});

export const bitisClient = new ApolloClient({
  link: from([errorLink, restFetchLink]),
  cache: new InMemoryCache(),
});
