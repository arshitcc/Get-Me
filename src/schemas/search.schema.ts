import { z } from "zod";

export const searchSchema = z.object({ search : z.string()});

export type SearchSchema = z.infer<typeof searchSchema>;