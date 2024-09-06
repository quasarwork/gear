import * as eslintConfigGear from "@quasarwork/eslint-config-gear";
import tseslint from "typescript-eslint";

const config = tseslint.config(...eslintConfigGear.configs.server);

export default config;
