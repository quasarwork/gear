export type JsonObject = {
  [Key in string]?: JsonValue | undefined;
} & { [Key in string]: JsonValue };
export type JsonArray = JsonValue[] | readonly JsonValue[];
export type JsonPrimitive = boolean | null | number | string;
export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

/**
 * Gadget allows us to configure a model property (PGSQL database) as a JSON
 * property.
 *
 * However, it does not support yet configuring a JSON Schema to have a
 * type-safe output when using the automatically generated JS client.
 *
 * Unfortunately, the current output of JSON properties is very unsafe. This
 * utility function aims to provide a "safer" output.
 *
 * @example
 *
 * ```ts
 * const value = jsonPropertyToObjectOrNullUnsafe({
 *   string: "foo",
 * });
 * console.log(value); // { string: "foo" }
 * ```
 *
 * @example
 *
 * ```ts
 * const value = jsonPropertyToObjectOrNullUnsafe(1000);
 * console.log(value); // { number: 1000 }
 * ```
 *
 * @example
 *
 * ```ts
 * const value = jsonPropertyToObjectOrNullUnsafe("someNonJsonString");
 * console.log(value); // { string: "someNonJsonString" }
 * ```
 *
 * @example
 *
 * ```ts
 * const value = jsonPropertyToObjectOrNullUnsafe([1, 2, 3]);
 * console.log(value); // [1, 2, 3]
 * ```
 *
 * @param value - The value to convert
 *
 * @returns The converted value
 */
export const jsonPropertyToObjectOrNullUnsafe = (
  value: JsonValue | null,
): JsonArray | JsonObject | null => {
  if (value === null) {
    return null;
  }

  if (typeof value === "string") {
    try {
      return JSON.parse(value) as JsonArray | JsonObject;
    } catch {
      return { string: value };
    }
  }

  if (typeof value === "number") {
    return { number: value };
  }

  if (typeof value === "boolean") {
    return { boolean: value };
  }

  if (typeof value === "object") {
    return value;
  }

  return {};
};

/**
 * Gadget expects a valid JSON object (or primitive) as a property value.
 * However, its current client screams at you when you pass some pre-defined
 * schema or branded type.
 *
 * This utility function aims to provide a quick way to convert a value to a
 * valid JSON object.
 *
 * The output is definitely not type and should only be used at the boundary of
 * your API, when saving your model to the database.
 */
export const toObjectOrNullUnsafe = (value: unknown) => {
  if (value === null) {
    return null;
  }

  try {
    return JSON.parse(String(value)) as JsonArray | JsonObject;
  } catch {
    return JSON.parse(JSON.stringify(value)) as JsonArray | JsonObject;
  }
};
