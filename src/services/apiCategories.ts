import supabase from "./supabase";

//* types for category
export interface Category {
  id: string;
  name: string;
  description?: string;
  displayOrder?: number;
  isVisible: boolean;
  categoryColor: string;
  slug: string;
  created_at: string;
  sessions?: number;
  tasks?: number;
}
export type CategoryInput = Omit<Category, "id" | "created_at">;

//* get all categories
export async function getCategories(): Promise<{
  data: Category[];
  count: number | null;
}> {
  const { data, error, count } = await supabase
    .from("categories")
    .select("*, sessions:sessions(count), tasks:tasks(count)", {
      count: "exact",
    })
    .order("displayOrder", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Could not fetch categories. Please try again later.");
  }
  // format the data to extract the number of sessions and tasks
  const formattedData: Category[] = (data || []).map((category) => ({
    ...category,
    sessions: category.sessions?.[0]?.count || 0,
    tasks: category.tasks?.[0]?.count || 0,
  }));

  return { data: formattedData, count };
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
interface UpdateCategoryInput {
  id: string;
  updatedData: Partial<CategoryInput>;
}

export async function updateCategory({
  id,
  updatedData,
}: UpdateCategoryInput): Promise<Category> {
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
