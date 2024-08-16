/* eslint-disable no-control-regex */
import { Schema, brand, filter } from "@effect/schema/Schema";

import { StringInRange1To254 } from "#progLangExtensions/ts/effect/schemas/string/stringInRange1To254.schema";

// I cannot remember whether this code was taken from a library or AI generated
// If you know where it comes from, please let me know and I will credit you

interface EmailOptions extends Record<string, unknown> {
  allow_display_name?: boolean;
  allow_underscores?: boolean;
  require_display_name?: boolean;
  allow_utf8_local_part?: boolean;
  require_tld?: boolean;
  blacklisted_chars?: string;
  ignore_max_length?: boolean;
  host_blacklist?: string[];
  host_whitelist?: string[];
  domain_specific_validation?: boolean;
  allow_ip_domain?: boolean;
}

const DEFAULT_EMAIL_OPTIONS = {
  allow_display_name: false,
  allow_underscores: false,
  require_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true,
  blacklisted_chars: "",
  ignore_max_length: false,
  host_blacklist: [],
  host_whitelist: [],
  domain_specific_validation: false,
  allow_ip_domain: false,
} satisfies EmailOptions;

const SPLIT_NAME_ADDRESS_REGEX = /^([^\x00-\x1F\x7F-\x9F]+)</i;
const EMAIL_USER_PART_REGEX = /^[a-z\d!#$%&'*+-/=?^_`{|}~]+$/i;
const GMAIL_USER_PART_REGEX = /^[a-z\d]+$/;
const QUOTED_EMAIL_USER_REGEX =
  /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
const EMAIL_USER_UTF8_PART_REGEX =
  /^[a-z\d!#$%&'*+\-/=?^_`{|}~\u00A1-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
const QUOTED_EMAIL_USER_UTF8_REGEX =
  /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
const DEFAULT_MAX_EMAIL_LENGTH = 254;
const IPV4_SEGMENT_REGEX =
  "(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
const IPV4_ADDRESS_REGEX = new RegExp(
  `^(${IPV4_SEGMENT_REGEX}[.]){3}${IPV4_SEGMENT_REGEX}$`,
);
const IPV6_SEGMENT_REGEX = "(?:[0-9a-fA-F]{1,4})";
const IPV6_ADDRESS_REGEX = new RegExp(
  "^(" +
    `(?:${IPV6_SEGMENT_REGEX}:){7}(?:${IPV6_SEGMENT_REGEX}|:)|` +
    `(?:${IPV6_SEGMENT_REGEX}:){6}(?:${String(IPV4_ADDRESS_REGEX)}|:${IPV6_SEGMENT_REGEX}|:)|` +
    `(?:${IPV6_SEGMENT_REGEX}:){5}(?::${String(IPV4_ADDRESS_REGEX)}|(:${IPV6_SEGMENT_REGEX}){1,2}|:)|` +
    `(?:${IPV6_SEGMENT_REGEX}:){4}(?:(:${IPV6_SEGMENT_REGEX}){0,1}:${String(IPV4_ADDRESS_REGEX)}|(:${IPV6_SEGMENT_REGEX}){1,3}|:)|` +
    `(?:${IPV6_SEGMENT_REGEX}:){3}(?:(:${IPV6_SEGMENT_REGEX}){0,2}:${String(IPV4_ADDRESS_REGEX)}|(:${IPV6_SEGMENT_REGEX}){1,4}|:)|` +
    `(?:${IPV6_SEGMENT_REGEX}:){2}(?:(:${IPV6_SEGMENT_REGEX}){0,3}:${String(IPV4_ADDRESS_REGEX)}|(:${IPV6_SEGMENT_REGEX}){1,5}|:)|` +
    `(?:${IPV6_SEGMENT_REGEX}:){1}(?:(:${IPV6_SEGMENT_REGEX}){0,4}:${String(IPV4_ADDRESS_REGEX)}|(:${IPV6_SEGMENT_REGEX}){1,6}|:)|` +
    `(?::((?::${IPV6_SEGMENT_REGEX}){0,5}:${String(IPV4_ADDRESS_REGEX)}|(?::${IPV6_SEGMENT_REGEX}){1,7}|:))` +
    ")(%[0-9a-zA-Z-.:]{1,})?$",
);

/**
 * Assert that the input is a string.
 */
const assertString = (input: unknown): void => {
  const isString = typeof input === "string" || input instanceof String;

  if (!isString) {
    let invalidType: typeof input = typeof input;

    if (input === null) {
      invalidType = "null";
    } else if (invalidType === "object") {
      invalidType = (input as "object").constructor.name;
    }

    throw new TypeError(
      `Expected a string but received a ${String(invalidType)}`,
    );
  }
};

/**
 * Check if a string's length falls within a given range.
 */
const isByteLength = (
  str: string,
  options: {
    min?: number;
    max?: number;
  } = {},
): boolean => {
  assertString(str);
  const len = encodeURI(str).split(/%..|./).length - 1;

  return (
    len >= (options.min ?? 0) &&
    (typeof options.max === "undefined" || len <= options.max)
  );
};

/**
 * Validate if a string is a fully qualified domain name (FQDN).
 */
const isFQDN = (
  str: string,
  options: Record<string, unknown> = {},
): boolean => {
  assertString(str);
  options = merge(options, {
    require_tld: true,
    allow_underscores: false,
    allow_trailing_dot: false,
    allow_numeric_tld: false,
    allow_wildcard: false,
    ignore_max_length: false,
  });

  if (options["allow_trailing_dot"] && str.endsWith(".")) {
    str = str.substring(0, str.length - 1);
  }

  if (options["allow_wildcard"] === true && str.startsWith("*.")) {
    str = str.substring(2);
  }

  const parts = str.split(".");
  const tld = parts[parts.length - 1];

  if (!tld) {
    return false;
  }

  if (options["require_tld"]) {
    if (parts.length < 2) {
      return false;
    }

    if (
      !options["allow_numeric_tld"] &&
      !/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(
        tld,
      )
    ) {
      return false;
    }

    if (/\s/.test(tld)) {
      return false;
    }
  }

  if (!options["allow_numeric_tld"] && /^\d+$/.test(tld)) {
    return false;
  }

  return parts.every((part) => {
    if (part.length > 63 && !options["ignore_max_length"]) {
      return false;
    }

    if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }

    if (/[\uff01-\uff5e]/.test(part)) {
      return false;
    }

    if (/^-|-$/.test(part)) {
      return false;
    }

    return !(!options["allow_underscores"] && part.includes("_"));
  });
};

/**
 * Check if a string is a valid IP (version 4 or 6).
 */
const isIP = (str: string, version: string | number = ""): boolean => {
  assertString(str);
  version = String(version);
  if (!version) {
    return isIP(str, 4) || isIP(str, 6);
  }
  if (version === "4") {
    return IPV4_ADDRESS_REGEX.test(str);
  }
  if (version === "6") {
    return IPV6_ADDRESS_REGEX.test(str);
  }
  return false;
};

/**
 * Merge two objects, with properties from the second object overriding those from the first.
 */
const merge = <T extends Record<string, unknown>>(obj: T, defaults: T): T => {
  for (const key in defaults) {
    if (typeof obj[key] === "undefined") {
      obj[key] = defaults[key];
    }
  }
  return obj;
};

/**
 * Validate display name according to the RFC2822.
 */
const validateDisplayName = (display_name: string): boolean => {
  const display_name_without_quotes = display_name.replace(/^"(.+)"$/, "$1");
  if (!display_name_without_quotes.trim()) {
    return false;
  }

  const contains_illegal = /[.";<>]/.test(display_name_without_quotes);
  if (contains_illegal) {
    if (display_name_without_quotes === display_name) {
      return false;
    }

    const all_start_with_back_slash =
      display_name_without_quotes.split('"').length ===
      display_name_without_quotes.split('\\"').length;
    if (!all_start_with_back_slash) {
      return false;
    }
  }

  return true;
};

/**
 * Implements fast shallow verification of email addresses.
 * This does not perform an email address real-time validation but instead check that the structure is valid.
 *
 * If you need stricter validation, consider using an external library.
 */
const isValidEmail = (
  str: string,
  options: EmailOptions = DEFAULT_EMAIL_OPTIONS,
): boolean => {
  assertString(str);
  options = merge<EmailOptions>(options, DEFAULT_EMAIL_OPTIONS);

  if (options.require_display_name ?? options.allow_display_name) {
    const display_email = SPLIT_NAME_ADDRESS_REGEX.exec(str);

    if (display_email) {
      let display_name = display_email[1];
      if (!display_name) {
        return false;
      }

      str = str.replace(display_name, "").replace(/(^<|>$)/g, "");

      if (display_name.endsWith(" ")) {
        display_name = display_name.slice(0, -1);
      }
      if (!validateDisplayName(display_name)) {
        return false;
      }
    } else if (options.require_display_name) {
      return false;
    }
  }

  if (!options.ignore_max_length && str.length > DEFAULT_MAX_EMAIL_LENGTH) {
    return false;
  }

  const parts = str.split("@");
  const domain = parts.pop()?.toLowerCase() ?? "";
  let user = parts.join("@");

  if (options.host_blacklist?.includes(domain)) {
    return false;
  }

  if (
    options.host_whitelist?.length &&
    options.host_whitelist.length > 0 &&
    !options.host_whitelist.includes(domain)
  ) {
    return false;
  }

  if (
    options.domain_specific_validation &&
    (domain === "gmail.com" || domain === "googlemail.com")
  ) {
    user = user.toLowerCase();
    const username = user.split("+")[0];

    if (!username) {
      return false;
    }

    if (!isByteLength(username.replace(/\./g, ""), { min: 6, max: 30 })) {
      return false;
    }
    const user_parts = username.split(".");

    for (const part of user_parts) {
      if (!GMAIL_USER_PART_REGEX.test(part)) {
        return false;
      }
    }
  }

  if (!isByteLength(user, { max: 64 }) || !isByteLength(domain, { max: 254 })) {
    return false;
  }

  if (
    !isFQDN(domain, {
      require_tld: options.require_tld,
      ignore_max_length: options.ignore_max_length,
      allow_underscores: options.allow_underscores,
    })
  ) {
    if (!options.allow_ip_domain) {
      return false;
    }

    if (!isIP(domain)) {
      if (!domain.startsWith("[") || !domain.endsWith("]")) {
        return false;
      }

      const noBracketdomain = domain.slice(1, -1);

      if (!isIP(noBracketdomain)) {
        return false;
      }
    }
  }

  if (
    options.blacklisted_chars &&
    user.search(new RegExp(`[${options.blacklisted_chars}]+`, "g")) !== -1
  ) {
    return false;
  }

  if (user.startsWith('"')) {
    user = user.slice(1, user.length - 1);

    return options.allow_utf8_local_part
      ? QUOTED_EMAIL_USER_UTF8_REGEX.test(user)
      : QUOTED_EMAIL_USER_REGEX.test(user);
  }

  const pattern = options.allow_utf8_local_part
    ? EMAIL_USER_UTF8_PART_REGEX
    : EMAIL_USER_PART_REGEX;
  const user_parts = user.split(".");

  for (const part of user_parts) {
    if (!pattern.test(part)) {
      return false;
    }
  }

  return true;
};

export const Email = StringInRange1To254.annotations({
  title: "Email",
  description: "A shallow verification of an email address",
}).pipe(
  filter((value) => isValidEmail(value, DEFAULT_EMAIL_OPTIONS)),
  brand("Email"),
);
export type Email = Schema.Type<typeof Email>;
