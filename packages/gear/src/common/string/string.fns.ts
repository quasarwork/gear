/**
 * Truncates a string to a given length, and adds an ellipsis if the string is
 * truncated.
 *
 * @example
 *
 * ```ts
 * const truncatedString = stringEllipsis("Hello World", 10);
 * console.log(truncatedString); // "Hello..."
 * ```
 *
 * @param str - The string to truncate
 * @param maxLength - The maximum length of the string
 * @param ellipsis - The ellipsis to add if the string is truncated
 *
 * @returns The truncated string with the ellipsis added
 */
export const stringEllipsis = (
  str: string,
  maxLength: number,
  ellipsis = "...",
): string => {
  if (str.length <= maxLength) {
    return str;
  }

  return `${str.slice(0, maxLength - ellipsis.length)}${ellipsis}`;
};
