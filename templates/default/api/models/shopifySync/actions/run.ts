import {
  ActionOptions,
  RunShopifySyncActionContext,
  applyParams,
  save,
} from "gadget-server";
import { preventCrossShopDataAccess, shopifySync } from "gadget-server/shopify";

export async function run({ params, record }: RunShopifySyncActionContext) {
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);
  await save(record);
  await shopifySync(params, record);
}

export async function onSuccess() {}

export const options: ActionOptions = {
  actionType: "create",
  triggers: { api: true },
};
