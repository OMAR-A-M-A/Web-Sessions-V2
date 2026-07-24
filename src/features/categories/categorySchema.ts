import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name is too long"),

  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    ),

  categoryColor: z
    .string()
    .regex(
      /^#([0-9a-fA-F]{3}){1,2}$/,
      "Must be a valid HEX color (e.g., #FF0000)",
    ),

  isVisible: z.boolean(),

  description: z.string().optional(),

  displayOrder: z.coerce
    .number()
    .int("Must be an integer")
    .min(0, "Order must be 0 or greater"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
