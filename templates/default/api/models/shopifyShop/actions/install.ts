import {
  ActionOptions,
  InstallShopifyShopActionContext,
  applyParams,
  save,
} from "gadget-server";

export async function run({ params, record }: InstallShopifyShopActionContext) {
  applyParams(params, record);
  await save(record);
}

export async function onSuccess() {
  // do nothing
}

export const options: ActionOptions = { actionType: "create" };
