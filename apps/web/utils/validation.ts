import { z } from "zod";

// max integer from postgres
export const idSchema = z.coerce.number().int().positive().max(2147483647);

// validate id
export function validateId(id: string): number | null {
  const result = idSchema.safeParse(id);
  return result.success ? result.data : null;
}
