export interface TaskSolution {
  id: string;
  task_id: string;
  rank: number;
  student_name: string;
  solution_url: string;
  notes: string | null;
  created_at: string;
}
export type TaskSolutionInput = Omit<TaskSolution, "id" | "created_at">;


