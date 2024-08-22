import * as parserBase from "@typescript-eslint/parser";
import pluginBase from "@typescript-eslint/eslint-plugin";
import type { TSESLint } from "@typescript-eslint/utils";

import clientConfig from "./configs/client.js";
import extensionsConfig from "./configs/extensions.js";
import serverConfig from "./configs/server.js";

const parser: TSESLint.FlatConfig.Parser = {
  meta: parserBase.meta,
  parseForESLint: parserBase.parseForESLint,
};

const plugin: TSESLint.FlatConfig.Plugin = pluginBase as Omit<
  typeof pluginBase,
  "configs"
>;

const configs = {
  client: clientConfig(plugin, parser),
  extensions: extensionsConfig(plugin, parser),
  server: serverConfig(plugin, parser),
};

export default { configs };
export { configs };
