
import z from "zod";

export const headerCreateSchema = z.object({
  name: z.string().min(1),
  active: z.boolean().optional(),
});

export const headerUpdateSchema = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  active: z.boolean().optional(),
});
