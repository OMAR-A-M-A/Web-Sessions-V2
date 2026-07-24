import supabase from "./supabase";

//* types for category
export interface Category {
  id: string;
  name: string;
  description?: string;
  displayOrder?: number;
  isVisible: boolean;
  categoryColor: string;
  slug:string;
  created_at: string;
}
export type CategoryInput = Omit<Category, "id" | "created_at">;

//* get all categories
export async function getCategories(): Promise<{
  data: Category[];
  count: number | null;
}> {
  const { data, error, count } = await supabase
    .from("categories")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Could not fetch categories. Please try again later.");
  }

  return { data: data ?? [], count };
}

//* get one category by id
export async function getCategoryById(id: string): Promise<Category> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching category ${id}:`, error);
    throw new Error("Category not found.");
  }

  return data;
}

//* add new category
export async function createCategory(
  newCategory: CategoryInput,
): Promise<Category> {
  const { data, error } = await supabase
    .from("categories")
    .insert([newCategory])
    .select()
    .single();

  if (error) {
    console.error("Error creating category:", error);
    throw new Error("Could not create the category.");
  }

  return data;
}

//* update category
export async function updateCategory(
  id: string,
  updatedData: Partial<CategoryInput>,
): Promise<Category> {
  const { data, error } = await supabase
    .from("categories")
    .update(updatedData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating category ${id}:`, error);
    throw new Error("Could not update the category.");
  }

  return data;
}

//* delete slected category
export async function deleteCategory(id: string): Promise<void> {
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting category ${id}:`, error);
    throw new Error("Could not delete the category.");
  }
}
