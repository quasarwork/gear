import {
  ActionOptions,
  UninstallShopifyShopActionContext,
  applyParams,
  save,
} from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

export async function run({
  params,
  record,
}: UninstallShopifyShopActionContext) {
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);
  await save(record);
}

export async function onSuccess() {}

export const options: ActionOptions = { actionType: "update" };