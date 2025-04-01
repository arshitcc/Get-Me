import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(3, "Enter valid email address."),
  password: z.string().min(8, "Enteer a Password must of at least 8 characters long."),
});

export type LoginSchema = z.infer<typeof loginSchema>;