import {
  ActionOptions,
  ErrorShopifySyncActionContext,
  applyParams,
  save,
} from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

export async function run({ params, record }: ErrorShopifySyncActionContext) {
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);
  await save(record);
}

export async function onSuccess() {
  // do nothing
}

export const options: ActionOptions = {
  actionType: "update",
  triggers: { api: true },
};
