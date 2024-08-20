import { ParseError } from "@effect/schema/ParseResult";
import { decode } from "@effect/schema/Schema";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { Uuid } from "./uuid.schema.js";

describe("uuid schema", () => {
  const UUID_VALID = {
    // time-based
    v1: "123e4567-e89b-11ed-a05b-002227de0000",
    // DCE Security
    v2: "000003e8-79a6-22ed-8000-00b0d0fa0000",
    // md5 hash-based
    v3: "3d813cbb-47fb-32ba-91df-831e1593ac29",
    // random
    v4: "123e4567-e89b-42d3-a456-426614174000",
    // sha-1 hash-based
    v5: "74738ff5-5367-5958-9aee-98fffdcd1876",
  };

  const UUID_INVALID = {
    "is too short": "123e4567-e89b-12d3-a456-42661417400",
    "is too long": "123e4567-e89b-12d3-a456-4266141740000",
    "has missing hyphens": "123e4567e89b12d3a45642661417400",
    "has invalid characters": "123e4567-e89b-12d3-a456-42661417400g",
    "has invalid version": "123e4567-e89b-62d3-a456-426614174000",
    "has invalid variant": "123e4567-e89b-42d3-c456-426614174000",
    "has malformed sections": {
      "first section is too short": "123e45-67e89b-42d3-a456-426614174000",
      "second section is too short": "123e4567-e89-42d3-a456-426614174000",
      "third section is too short": "123e4567-e89b-42d-a456-426614174000",
      "fourth section is too short": "123e4567-e89b-42d3-a45-426614174000",
    },
    "is not hexadecimal": "gggggggg-gggg-gggg-gggg-gggggggggggg",
  };

  describe("valid uuids", () => {
    for (const [version, uuid] of Object.entries(UUID_VALID)) {
      describe(`version ${version}`, () => {
        it.effect(`should accept ${uuid}`, () =>
          Effect.gen(function* () {
            const result = yield* decode(Uuid)(uuid);

            expect(result).toBe(uuid);
          }),
        );
      });
    }
  });

  describe("invalid uuids", () => {
    for (const [reason, uuid] of Object.entries(UUID_INVALID)) {
      describe(`it should reject uuid when value ${reason}`, () => {
        if (typeof uuid === "string") {
          it.effect(`should reject ${uuid}`, () =>
            Effect.gen(function* () {
              const result = yield* Effect.flip(decode(Uuid)(uuid));

              expect(result).toBeInstanceOf(ParseError);
            }),
          );
        }

        if (typeof uuid === "object") {
          for (const [reason, _uuid] of Object.entries(uuid)) {
            it.effect(`should reject ${_uuid} because its ${reason}`, () =>
              Effect.gen(function* () {
                const result = yield* Effect.flip(decode(Uuid)(_uuid));

                expect(result).toBeInstanceOf(ParseError);
              }),
            );
          }
        }
      });
    }
  });
});
