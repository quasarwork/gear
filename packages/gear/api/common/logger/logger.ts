import { Context } from "effect";
import { PACKAGE_NAME } from "package.constants.js";

export interface Logger {
  readonly debug: LoggerMethod;
  readonly info: LoggerMethod;
  readonly warn: LoggerMethod;
  readonly error: LoggerMethod;
  readonly fatal: LoggerMethod;
}

export interface LoggerMethod {
  (obj: unknown, msg?: string, ...args: unknown[]): void;
  (msg: string, obj?: unknown, ...args: unknown[]): void;
}

export const Logger = Context.GenericTag<Logger>(
  `${PACKAGE_NAME}/api/common/Logger`,
);
