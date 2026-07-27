import { getCategoryOptions } from "@/services/apiCategories";
import { useQuery } from "@tanstack/react-query";

export function useGetCategoryOptions() {
  const { data: options, isPending: isLoadingCategoryOptions } = useQuery({
    queryFn: getCategoryOptions,
    queryKey: ["categoryOptions"],
  });
  return { options, isLoadingCategoryOptions };
}
