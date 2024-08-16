import { viteConfigBase } from "vite.config.base";
import { type UserConfigExport, mergeConfig } from "vitest/config";

const config: UserConfigExport = {};

export default mergeConfig(viteConfigBase, config);
