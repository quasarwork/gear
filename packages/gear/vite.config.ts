import { type UserConfigExport, mergeConfig } from "vitest/config";

// noinspection ES6PreferShortImport
import { viteConfigBase } from "./vite.config.base";

const config: UserConfigExport = {};

export default mergeConfig(viteConfigBase, config);
