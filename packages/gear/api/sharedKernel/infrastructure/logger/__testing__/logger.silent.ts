import {
  Logger,
  LoggerMethod,
} from "api/sharedKernel/application/logger/logger";
import { Layer } from "effect";

const silentLoggerMethod: LoggerMethod = () => {
  // do nothing
};

const log = (silent: boolean) => {
  return silent ? silentLoggerMethod : console.log;
};

export const LoggerSilent = ({ isSilent }: { isSilent: boolean }) =>
  Layer.succeed(
    Logger,
    Logger.of({
      debug: log(isSilent),
      error: log(isSilent),
      fatal: log(isSilent),
      info: log(isSilent),
      warn: log(isSilent),
    }),
  );
