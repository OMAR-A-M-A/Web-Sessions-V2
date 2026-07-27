export interface Session {
  id: string;
  category_id: string;
  title: string;
  description?: string | null;
  notion_url: string | null;
  cover_image?: string | null;
  display_order: number;
  is_visible: boolean;
  estimated_reading_time?: number | null;
  created_at: string;
  publishDate: string;
}

export type SessionInput = Omit<Session, "id" | "created_at">;

export interface SessionWithDetails extends Session {
  categories: {
    name: string;
    slug: string;
    categoryColor: string;
  } | null;
  tasks: number;
}

export interface GetSessionsParams {
  filters?:
    | { field: string; value: string | number | boolean; method?: string }[]
    | null;
  sortBy?: { field: string; direction: "asc" | "desc" } | null;
  page?: number | null;
}
