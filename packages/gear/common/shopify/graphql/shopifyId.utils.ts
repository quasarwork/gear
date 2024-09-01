/**
 * @description Converts a legacy ID to a GraphQL ID
 *
 * @param resource - The capitalized Shopify resource type (e.g. "Product")
 * @param legacyId - The legacy ID
 * @returns - The GraphQL ID
 *
 * @example
 *
 * ```ts
 * const graphqlId = legacyIdToGraphQLId("Product", "1234567890");
 * console.log(graphqlId); // "gid://shopify/Product/1234567890"
 * ```
 */
export const legacyIdToGraphQLId = (resource: string, legacyId: string) => {
  const capitalizedResource = `${resource.charAt(0).toUpperCase()}${resource.slice(
    1,
  )}`;

  return `gid://shopify/${capitalizedResource}/${legacyId}`;
};

/**
 * @description Converts a GraphQL ID to a legacy ID
 *
 * @param graphqlId - Expects a GraphQL ID in the format `gid://shopify/{resource}/{legacyId}`
 * @returns - The legacy ID
 *
 * @example
 *
 * ```ts
 * const legacyId = graphQLIdToLegacyId("gid://shopify/Product/1234567890");
 * console.log(legacyId); // "1234567890"
 * ```
 */
export const graphQLIdToLegacyId = (graphqlId: string) =>
  graphqlId.split("/").pop()!;
