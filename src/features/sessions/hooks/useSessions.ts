import { getSessions } from "@/services/apiSessions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "@/utils/constants";
interface filterObj {
  field: "category_id" | "is_visible";
  value: string | boolean | number;
}
export function useSessions() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTERS
  const categoryValue = searchParams.get("category");
  const visibleValue = searchParams.get("is_visible");

  const filters: filterObj[] = [];

  if (categoryValue && categoryValue !== "all") {
    filters.push({ field: "category_id", value: categoryValue });
  }

  if (visibleValue && visibleValue !== "all") {
    filters.push({ field: "is_visible", value: visibleValue === "true" });
  }

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "display_order-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction: direction as "asc" | "desc" };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    data: { data: sessions, count } = {},
    isPending: isLoadingSessions,
    error,
  } = useQuery({
    queryKey: ["sessions", filters, sortBy, page],
    queryFn: () => getSessions({ filters, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil((count || 0) / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["sessions", filters, sortBy, page + 1],
      queryFn: () => getSessions({ filters, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["sessions", filters, sortBy, page - 1],
      queryFn: () => getSessions({ filters, sortBy, page: page - 1 }),
    });
  }

  return { sessions, isLoadingSessions, error, count };
}
