import { getFeedbacks } from "@/services/apiFeedbacks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "@/utils/constants";

interface filterObj {
  field: "category" | "is_read";
  value: string | boolean;
}

export function useFeedbacks() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTERS
  const categoryValue = searchParams.get("category");
  const isReadValue = searchParams.get("is_read");

  const filters: filterObj[] = [];

  if (categoryValue && categoryValue !== "all") {
    filters.push({ field: "category", value: categoryValue });
  }

  if (isReadValue && isReadValue !== "all") {
    filters.push({ field: "is_read", value: isReadValue === "true" });
  }

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction: direction as "asc" | "desc" };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    data: { data: feedbacks, count } = {},
    isPending: isLoadingFeedbacks,
    error,
  } = useQuery({
    queryKey: ["feedbacks", filters, sortBy, page],
    queryFn: () => getFeedbacks({ filters, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil((count || 0) / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["feedbacks", filters, sortBy, page + 1],
      queryFn: () => getFeedbacks({ filters, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["feedbacks", filters, sortBy, page - 1],
      queryFn: () => getFeedbacks({ filters, sortBy, page: page - 1 }),
    });
  }

  return { feedbacks, isLoadingFeedbacks, error, count };
}
