import {
  ActionOptions,
  UpdateShopifyGdprRequestActionContext,
  applyParams,
  save,
} from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

/**
 * @param { UpdateShopifyGdprRequestActionContext } context
 */
export async function run({
  params,
  record,
}: UpdateShopifyGdprRequestActionContext) {
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);
  await save(record);
}

export async function onSuccess() {}

export const options: ActionOptions = { actionType: "update" };
