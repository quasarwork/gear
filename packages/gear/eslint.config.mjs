import eslintConfigGearBase from "@quasarwork/eslint-config-gear/eslint.config.base.mjs";
import tseslint from "typescript-eslint";

const config = tseslint.config(...eslintConfigGearBase);

export default config;
