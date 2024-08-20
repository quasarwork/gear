import {
  AbortShopifySyncActionContext,
  ActionOptions,
  applyParams,
  save,
} from "gadget-server";
import { abortSync, preventCrossShopDataAccess } from "gadget-server/shopify";

export async function run({ params, record }: AbortShopifySyncActionContext) {
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);
  await abortSync(params, record);
  await save(record);
}

export async function onSuccess() {}

export const options: ActionOptions = {
  actionType: "update",
  triggers: { api: true },
};
