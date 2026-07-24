import { getCategories } from "@/services/apiCategories";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  const {
    data: { data: categories, count } = {},
    isPending: isLoadingCategories,
  } = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
  });
  return { categories, isLoadingCategories, count };
}
