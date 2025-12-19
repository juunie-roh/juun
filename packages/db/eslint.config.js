import { base, typescript } from "@config/eslint";

export default [
  ...base,
  ...typescript,
  {
    ignores: ["generated/prisma/**/*"],
  },
];
