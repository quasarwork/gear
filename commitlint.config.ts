import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["gitmoji"],

  rules: {
    "scope-case": [1, "always", "lowercase"],
    "scope-empty": [1, "always"],
    "subject-case": [1, "always", "lowercase"],
    "subject-empty": [1, "always"],
    "type-case": [1, "always", "lowercase"],
    "type-empty": [1, "always"],
  },
};

export default Configuration;
