import tseslint from "typescript-eslint";

import eslintConfigGearBase from "./eslint.config.base.mjs";

const config = tseslint.config(...eslintConfigGearBase);

export default config;
