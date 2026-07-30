import supabase from "./supabase";
import type { TaskSolution, TaskSolutionInput } from "@/types/taskSolutionsTypes";

//* create a new task solution
interface CreateSolutionArgs {
  taskId: string;
  newSolution: Omit<TaskSolutionInput, "task_id">;
}

export async function createSolution({ taskId, newSolution }: CreateSolutionArgs): Promise<TaskSolution> {
  const { data, error } = await supabase
    .from("task_solutions")
    .insert([{ ...newSolution, task_id: taskId }])
    .select()
    .single();

  if (error) {
    console.error("Error creating task solution:", error);
    throw new Error("Could not create the task solution.");
  }

  return data;
}

//* update an existing task solution
interface UpdateSolutionArgs {
  solutionId: string;
  updatedSolution: Partial<TaskSolutionInput>;
}

export async function updateSolution({
  solutionId,
  updatedSolution,
}: UpdateSolutionArgs): Promise<TaskSolution> {
  const { data, error } = await supabase
    .from("task_solutions")
    .update(updatedSolution)
    .eq("id", solutionId)
    .select()
    .single();

  if (error) {
    console.error(`Error updating task solution ${solutionId}:`, error);
    throw new Error("Could not update the task solution.");
  }

  return data;
}

//* delete a task solution
export async function deleteSolution(solutionId: string): Promise<void> {
  const { error } = await supabase
    .from("task_solutions")
    .delete()
    .eq("id", solutionId);

  if (error) {
    console.error(`Error deleting task solution ${solutionId}:`, error);
    throw new Error("Could not delete the task solution.");
  }
}
