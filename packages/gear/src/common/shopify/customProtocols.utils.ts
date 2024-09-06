/**
 * Use the `shopify:admin protocol` when you want to construct a URL with a root of the Shopify Admin.
 *
 * @param path - The path to append to the `shopify:admin` protocol
 * @returns The constructed URL
 *
 * @see https://shopify.dev/docs/api/admin-extensions#custom-protocols-shopify-protocol
 *
 * @example
 * ```ts
 * const url = toShopifyProtocol("products");
 * console.log(url); // "shopify:admin/products"
 * ```
 */
export const shopifyProtocol = (path: string): string => {
  return `shopify:admin/${path}`;
};

/**
 * Use the `app:` protocol to construct a URL for your app.
 * Shopify will handle constructing the base URL for your app.
 * This works for both embedded and non-embedded apps.
 *
 * @param path - The path to append to the `app:` protocol
 * @returns The constructed URL
 *
 * @see https://shopify.dev/docs/api/admin-extensions#custom-protocols-app-protocol
 *
 * @example
 * ```ts
 * const url = toAppProtocol("products");
 * console.log(url); // "app:products"
 * ```
 */
export const appProtocol = (path: string): string => {
  return `app:${path}`;
};

/**
 * Use the `extension:` protocol to construct a URL for your extension.
 *
 * Triggers an action extension from a block extension using the extension: protocol.
 * The `extensionTarget` is the target of the action extension.
 * The `handle` is the handle of the action extension that will be opened.
 *
 * @param extensionHandle
 * @param extensionTarget
 * @returns The constructed URL
 *
 * @see https://shopify.dev/docs/api/admin-extensions#custom-protocols-extension-protocol
 *
 * @example
 * ```ts
 * const url = extensionProtocol({
 *   extensionHandle: "my-extension-handle",
 *   extensionTarget: "my-extension-target",
 * });
 * console.log(url); // "extension:my-extension-handle/my-extension-target"
 * ```
 */
export const extensionProtocol = ({
  extensionHandle,
  extensionTarget,
}: {
  extensionHandle: string;
  extensionTarget: string;
}): string => {
  return `extension:${extensionHandle}/${extensionTarget}`;
};
