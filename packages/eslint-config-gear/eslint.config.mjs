import tseslint from "typescript-eslint";

import * as eslintConfigGear from "./build/esm/index.js";

const config = tseslint.config(...eslintConfigGear.configs.server);

export default config;
