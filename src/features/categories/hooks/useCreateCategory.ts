import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory as createCategoryApi } from "@/services/apiCategories";
import toast from "react-hot-toast";

function useCreateCategory() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createCategory } = useMutation({
    mutationFn: createCategoryApi,
    onSuccess: () => {
      toast.success("Category created successfully");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createCategory };
}

export { useCreateCategory };
