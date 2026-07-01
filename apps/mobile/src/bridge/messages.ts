export type WebToNative =
  | { type: "NAVIGATION"; path: string }
  | { type: "SHARE"; url: string; title: string };

export type NativeToWeb =
  { type: "THEME"; value: "light" | "dark" } | { type: "BACK" };
