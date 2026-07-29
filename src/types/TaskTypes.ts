export interface Task {
  id: string;
  category_id: string;
  task_type: "coding" | "research";
  session_id: string | null;
  title: string;
  summary: string | null;
  description: string | null;
  is_visible: boolean;
  created_at: string;
}

export type TaskInput = Omit<Task, "id" | "created_at">;

export interface TaskAttachment {
  id: string;
  task_id: string | null;
  link: string;
  type: "image" | "link";
}

export interface TaskSolution {
  id: string;
  task_id: string;
  rank: number;
  student_name: string;
  solution_url: string;
  notes: string | null;
  created_at: string;
}

export interface TaskWithDetails extends Task {
  task_attachments: TaskAttachment[];
  task_solutions: TaskSolution[];
  categories: {
    name: string;
    slug: string;
    categoryColor: string;
  } | null;
}
export interface GetTaskssParams {
  filters?:
    | { field: string; value: string | number | boolean; method?: string }[]
    | null;
  sortBy?: { field: string; direction: "asc" | "desc" } | null;
  page?: number | null;
}
