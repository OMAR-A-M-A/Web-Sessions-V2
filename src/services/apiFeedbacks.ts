import supabase from "./supabase";
import type {
  Feedback,
  FeedbackInput,
  FeedbackForEdit,
  GetFeedbacksParams,
} from "@/types/feedbackTypes";
import { PAGE_SIZE } from "@/utils/constants";

//* get all feedbacks with pagination, filtering, sorting
export async function getFeedbacks({
  filters,
  sortBy,
  page,
}: GetFeedbacksParams): Promise<{
  data: Feedback[];
  count: number | null;
}> {
  let query = supabase
    .from("feedbacks")
    .select("*", { count: "exact" });

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
    // default sorting (newest first)
    query = query.order("created_at", { ascending: false });
  }

  // apply pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching feedbacks:", error);
    throw new Error("Could not fetch feedbacks. Please try again later.");
  }

  return { data, count };
}

//* create new feedback
export async function createFeedback(
  newFeedback: FeedbackInput,
): Promise<Feedback> {
  const { data, error } = await supabase
    .from("feedbacks")
    .insert([newFeedback])
    .select()
    .single();

  if (error) {
    console.error("Error creating feedback:", error);
    throw new Error("Could not submit the feedback.");
  }

  return data;
}

//* update feedback
export async function updateFeedback({
  id,
  updatedFeedback,
}: {
  id: string;
  updatedFeedback: FeedbackForEdit;
}): Promise<Feedback> {
  const { data, error } = await supabase
    .from("feedbacks")
    .update(updatedFeedback)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating feedback ${id}:`, error);
    throw new Error("Could not update the feedback.");
  }

  return data;
}

//* delete selected feedback
export async function deleteFeedback(id: string): Promise<void> {
  const { error } = await supabase.from("feedbacks").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting feedback ${id}:`, error);
    throw new Error("Could not delete the feedback.");
  }
}
