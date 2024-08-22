import eslintConfigGearServer from "@quasarwork/eslint-config-gear/eslint.config.server.mjs";
import tseslint from "typescript-eslint";

const config = tseslint.config(...eslintConfigGearServer);

export default config;
