# @quasarwork/eslint-config-gear

This package provides an opinionated ESLint configuration for [Quasar.work]'s [Gear ⚙️] projects.

Learn more about [ESLint configuration](https://eslint.org/docs/user-guide/configuring).

Learn more about [Typescript ESLint configuration](https://typescript-eslint.io/users/configs).

## Installation

```bash
yarn add -D eslint typescript typescript-eslint @quasarwork/eslint-config-gear
```

## Usage

Add the following to your `estlint.config.mjs` file:

```js
import eslintConfigGearServer from "@quasarwork/eslint-config-gear/eslint.config.server.mjs";
import tseslint from "typescript-eslint";

const config = tseslint.config(...eslintConfigGearServer);

export default config;
```

### Notes

Some rules have been disabled because of some conflicts with [Gadget] and [Effect] features.

See [source code](./eslint.config.base.mjs) for more details.

## Available configurations

### `server.mjs`

This configuration is the base configuration for all [Quasar.work]'s [Gear ⚙️] projects.

In a Gear Shopify app, this will be the configuration used in the `eslint.config.mjs` file at the root of the project.

### `client.mjs`

This configuration extends the `base.mjs` configuration and adds some features related to a client side usage.

In a Gear Shopify app, this configuration will be used in the `eslint.config.mjs` file at the root of your `/web` directory (client side).

### `extensions.mjs`

This configuration extends the `base.mjs` configuration and adds some features related to a client side usage.

In a Gear Shopify app, this configuration will be used in the `eslint.config.mjs` file at the root of your `/extensions` directory (client side).

## License

[MIT] © [Quasar.work] ([Aurélien BOBENRIETH])

[Quasar.work]: https://quasar.work
[Gear ⚙️]: https://github.com/quasarwork/gear
[Gadget]: https://gadget.dev
[effect]: https://github.com/Effect-TS/effect/tree/main
[Aurélien BOBENRIETH]: https://github.com/aurelienbobernieth
[MIT]: https://github.com/quasarwork/gear/blob/main/LICENSE
