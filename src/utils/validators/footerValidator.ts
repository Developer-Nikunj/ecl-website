import z from "zod";

export const footerSchema = z.object({
  name: z.string().min(1, "Footer HTML is required"),
  active: z.boolean().optional(),
});
