import { Layer } from "effect";
import pino from "pino";

import {
  Logger,
  type LoggerMethod,
} from "#server/sharedKernel/application/logger/logger.js";

export type SupportedLogLevels = "debug" | "error" | "fatal" | "info" | "warn";

const emojis: Record<SupportedLogLevels, string> = {
  debug: "🐛",
  error: "❌",
  fatal: "💀",
  info: "📝",
  warn: "⚠️",
};

export const loggerMethodCreate =
  (pinoLogger: pino.BaseLogger, loggerName: string) =>
  (level: SupportedLogLevels): LoggerMethod => {
    return (
      firstArg: unknown,
      secondArg?: unknown,
      ...additionalArgs: unknown[]
    ) => {
      const scopedLogger = pinoLogger;

      const emoji = emojis[level];

      let message = "";
      let obj = {};

      if (typeof firstArg === "string") {
        message = firstArg;

        if (typeof secondArg === "object") {
          obj = { ...secondArg };
        }
      } else if (typeof firstArg === "object") {
        obj = { ...firstArg };

        if (typeof secondArg === "string") {
          message = secondArg;
        }
      }

      const logMessage = `${emoji} ${message}`;
      const args = additionalArgs.filter((arg) => arg !== undefined);
      scopedLogger[level](
        {
          logger: loggerName,
          ...obj,
          args: args.length ? args : undefined,
        },
        logMessage,
      );
    };
  };

const LOGGER_NAME = "@quasarwork/LoggerPino";
export const LoggerPino = (pinoLogger: pino.BaseLogger) =>
  Layer.succeed(
    Logger,
    Logger.of({
      debug: loggerMethodCreate(pinoLogger, LOGGER_NAME)("debug"),
      error: loggerMethodCreate(pinoLogger, LOGGER_NAME)("error"),
      fatal: loggerMethodCreate(pinoLogger, LOGGER_NAME)("fatal"),
      info: loggerMethodCreate(pinoLogger, LOGGER_NAME)("info"),
      warn: loggerMethodCreate(pinoLogger, LOGGER_NAME)("warn"),
    }),
  );
