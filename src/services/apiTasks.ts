import supabase from "./supabase";
import { PAGE_SIZE } from "@/utils/constants";
import type {
  Task,
  TaskInput,
  TaskWithDetails,
  GetTaskssParams,
  TaskListItem,
} from "@/types/TaskTypes";

//* get all tasks with pagination, filtering, sorting, and specific fields
export async function getTasks({
  filters,
  sortBy,
  page,
  pageSize,
}: GetTaskssParams): Promise<{ data: TaskListItem[]; count: number | null }> {
  let query = supabase
    .from("tasks")
    .select(
      "id, task_type, title, summary, is_visible, categories(name, categoryColor, slug), sessions(title), task_attachments(count), task_solutions(count)",
      { count: "exact" },
    );

  // apply filters
  if (filters && filters.length > 0) {
    filters.forEach((f) => {
      if (f.method) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        query = (query as any)[f.method](f.field, f.value);
      } else {
        query = query.eq(f.field, f.value);
      }
    });
  }

  // apply sorting
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  } else {
    // default sorting
    query = query.order("created_at", { ascending: false });
  }

  // apply pagination
  if (page) {
    const limit = pageSize || PAGE_SIZE;
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Could not fetch tasks. Please try again later.");
  }

  // format the data to match requested output (extract counts, extract titles)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formattedData: TaskListItem[] = (data || []).map((task: any) => ({
    id: task.id,
    task_type: task.task_type,
    title: task.title,
    summary: task.summary,
    is_visible: task.is_visible,
    categories: Array.isArray(task.categories)
      ? task.categories[0]
      : task.categories,
    sessionTitle: Array.isArray(task.sessions)
      ? task.sessions[0]?.title
      : task.sessions?.title,
    task_attachments: task.task_attachments?.[0]?.count || 0,
    task_solutions: task.task_solutions?.[0]?.count || 0,
  }));

  return { data: formattedData, count };
}

//* get one task by id
export async function getTask(id: string): Promise<TaskWithDetails> {
  const { data, error } = await supabase
    .from("tasks")
    .select(
      "*, categories(name, slug, categoryColor), sessions(title), task_attachments(*), task_solutions(*)"
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching task ${id}:`, error);
    throw new Error("Task not found.");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { sessions, categories, ...taskData }: any = data;

  return {
    ...taskData,
    sessionTitle: Array.isArray(sessions)
      ? sessions[0]?.title
      : sessions?.title,
    categories: Array.isArray(categories) ? categories[0] : categories,
  } as TaskWithDetails;
}

//* add new task
export async function createTask(newTask: TaskInput): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .insert([newTask])
    .select()
    .single();

  if (error) {
    console.error("Error creating task:", error);
    throw new Error("Could not create the task.");
  }

  return data;
}

//* update task
interface UpdateTaskArgs {
  id: string;
  updatedTask: Partial<TaskInput>;
}

export async function updateTask({
  id,
  updatedTask,
}: UpdateTaskArgs): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .update(updatedTask)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating task ${id}:`, error);
    throw new Error("Could not update the task.");
  }

  return data;
}

//* delete selected task
export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting task ${id}:`, error);
    throw new Error("Could not delete the task.");
  }
}
