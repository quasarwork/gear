// eslint-disable-next-line
export type ErrorBaseProps<T extends Record<string, unknown> = {}> = {
  [key in keyof T]: T[keyof T];
} & {
  cause?: Error["cause"];
  message?: string;
  metadata?: Record<string, unknown>;
};
