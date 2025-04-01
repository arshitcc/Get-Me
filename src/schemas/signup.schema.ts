import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  email: z
    .string()
    .email()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address."
    ),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long."),
});

export type SignupSchema = z.infer<typeof signupSchema>;