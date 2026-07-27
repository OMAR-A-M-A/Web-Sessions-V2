import { getSessions } from "@/services/apiSessions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "@/utils/constants";

export function useSessions() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  // By default, looking for a "category" parameter in the URL.
  // You can change "category" to match whatever filterName you pass to the Filter component.
  const filterValue = searchParams.get("category");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "category_id", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "display_order-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction: direction as "asc" | "desc" };

  // PAGINATION
  const page = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  // QUERY
  const {
    data: { data: sessions, count } = {},
    isPending: isLoadingSessions,
  } = useQuery({
    queryKey: ["sessions", filter, sortBy, page],
    queryFn: () => getSessions({ filter, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil((count || 0) / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["sessions", filter, sortBy, page + 1],
      queryFn: () => getSessions({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["sessions", filter, sortBy, page - 1],
      queryFn: () => getSessions({ filter, sortBy, page: page - 1 }),
    });
  }

  return { sessions, isLoadingSessions, count };
}
