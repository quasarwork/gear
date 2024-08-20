import { type UserConfigExport, mergeConfig } from "vitest/config";

import { viteConfigBase } from "./vite.config.base.js";

const config: UserConfigExport = {};

export default mergeConfig(viteConfigBase, config);
