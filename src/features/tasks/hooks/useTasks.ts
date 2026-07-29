import { getTasks } from "@/services/apiTasks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "@/utils/constants";

interface filterObj {
  field: string;
  value: string | boolean | number;
}

export function useTasks() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTERS
  const categoryValue = searchParams.get("category");
  const taskTypeValue = searchParams.get("task_type");
  const visibleValue = searchParams.get("is_visible");

  const filters: filterObj[] = [];

  if (categoryValue && categoryValue !== "all") {
    filters.push({ field: "category_id", value: categoryValue });
  }

  if (taskTypeValue && taskTypeValue !== "all") {
    filters.push({ field: "task_type", value: taskTypeValue });
  }

  if (visibleValue && visibleValue !== "all") {
    filters.push({ field: "is_visible", value: visibleValue === "true" });
  }

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction: direction as "asc" | "desc" };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    data: { data: tasks, count } = {},
    isPending: isLoadingTasks,
    error,
  } = useQuery({
    queryKey: ["tasks", filters, sortBy, page],
    queryFn: () => getTasks({ filters, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil((count || 0) / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["tasks", filters, sortBy, page + 1],
      queryFn: () => getTasks({ filters, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["tasks", filters, sortBy, page - 1],
      queryFn: () => getTasks({ filters, sortBy, page: page - 1 }),
    });
  }

  return { tasks, isLoadingTasks, error, count };
}
