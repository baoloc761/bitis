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

const URL_BUILDERS: Record<string, (vars?: Record<string, unknown>) => string> = {
  GetBitisProducts: (vars = {}) => {
    const { collection, page, limit } = vars;
    return `${API_BASE}/collections/${collection}/products.json?include=metafields[product,hrvmultilang_en]&page=${page}&limit=${limit}`;
  },
  GetBitisStores: () => `${API_BASE}/pages/get-data-store?view=data-store`,
};

const restFetchLink = new ApolloLink((operation, forward) => {
  return new Observable<FetchResult>((observer) => {
    const opName = operation.operationName as unknown as string;
    if (!opName) {
      observer.error(new Error("Operation name is missing"));
      observer.complete();
      return;
    }

    const builder = URL_BUILDERS[opName];
    if (typeof builder !== "function") {
      observer.error(new Error(`Unsupported operation: ${opName}`));
      observer.complete();
      return;
    }

    const url = builder(operation.variables || {});

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
    graphQLErrors.forEach((e) => console.warn(`[GraphQL error]: ${e.message}`));
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError.message}`);
  }
});

export const bitisClient = new ApolloClient({
  link: from([errorLink, restFetchLink]),
  cache: new InMemoryCache(),
});
