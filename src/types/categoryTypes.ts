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
