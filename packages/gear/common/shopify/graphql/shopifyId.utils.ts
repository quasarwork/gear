export const legacyIdToGraphQLId = (resource: string, legacyId: string) =>
  `gid://shopify/${resource}/${legacyId}`;

export const graphQLIdToLegacyId = (graphqlId: string) =>
  graphqlId.split("/").pop()!;
