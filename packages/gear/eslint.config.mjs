import eslintConfigGear from "@quasarwork/eslint-config-gear/base";
import tseslint from "typescript-eslint";

const config = tseslint.config(...eslintConfigGear);

export default config;
