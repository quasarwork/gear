# @quasarwork/gear-tsconfig

This package provides an opinionated TypeScript configuration for [Quasar.work]'s [Gear ⚙️] projects.

Learn more about [TypeScript configurations](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

## Install

Run the following command to install this package:

```bash
yarn add -D @quasarwork/gear-tsconfig
```

## Usage

To enable a configuration, extend your `tsconfig.json` file by adding the `extends` property with the name of the configuration you want to use:

```json
{
  "extends": "@quasarwork/gear-tsconfig/tsconfig.server.json"
}
```

## Available configurations

### `tsconfig.server.json`

This configuration is the base configuration for all [Quasar.work]'s [Gear ⚙️] projects.

In a Gear Shopify app, this will be the configuration used in the `tsconfig.json` file at the root of the project.

#### Notes

The used `module` and `moduleResolution` are based on the ones that can be found when kicking off a new [Gadget] app under the `.gadget/server/tsconfig.json` file.

⚠️ The `strict` property is mandatory for [effect] to work properly. See [https://github.com/Effect-TS/effect/tree/main?tab=readme-ov-file#requirements](https://github.com/Effect-TS/effect/tree/main?tab=readme-ov-file#requirements).

⚠️ The `exactOptionalPropertyTypes` property is mandatory for [@effect/schema] to work properly. See [https://github.com/Effect-TS/effect/tree/main/packages/schema#requirements](https://github.com/Effect-TS/effect/tree/main/packages/schema#requirements).

### `tsconfig.client.json`

This configuration extends the `base.json` configuration and replaces the `module` and `moduleResolution` as well as the `target` properties. It also adds some features related to a client side usage.

In a Gear Shopify app, this configuration will be used in the `tsconfig.json` file at the root of your `/web` directory (client side).

#### Notes

The used `module`, `moduleResolution` are based on the ones that can be found when kicking off a new [Gadget] app under the `.gadget/client/tsconfig.json` file.

### `tsconfig.extensions.json`

This configuration extends the `base.json` configuration and replaces the `module` and `moduleResolution` as well as the `target` properties. It also adds some features related to a client side usage.

In a Gear Shopify app, this configuration will be used in the `tsconfig.json` file at the root of your `/extensions` directory (client side).

#### Notes

⚠️ The `target` being `es2015` means that Shopify extensions are currently unable to use [@effect/schema].

## License

[MIT] © [Quasar.work] ([Aurélien BOBENRIETH])

[Quasar.work]: https://quasar.work
[Gear ⚙️]: https://github.com/quasarwork/gear
[Gadget]: https://gadget.dev
[effect]: https://github.com/Effect-TS/effect/tree/main
[@effect/schema]: https://github.com/Effect-TS/effect/tree/main/packages/schema
[Aurélien BOBENRIETH]: https://github.com/aurelienbobernieth
[MIT]: https://github.com/quasarwork/gear/blob/main/LICENSE
