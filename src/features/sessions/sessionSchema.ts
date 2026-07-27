import { z } from "zod";

export const sessionSchema = z.object({
  category_id: z.string().min(1, "Please select a technology/category"),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title is too long"),
  description: z.string().optional(),
  notion_url: z.url("Must be a valid URL").or(z.literal("")),
  display_order: z.coerce
    .number({ error: "Must be a number" })
    .int("Must be an integer")
    .min(0, "Order must be 0 or greater"),
  estimated_reading_time: z.coerce
    .number({ error: "Must be a number" })
    .int("Must be an integer")
    .min(0, "Reading time must be 0 or greater")
    .optional(),
  publishDate: z.string().min(1, "Publish date is required"),
  is_visible: z.boolean(),
  cover_image: z.any().optional(),
});

export type SessionFormData = z.infer<typeof sessionSchema>;
