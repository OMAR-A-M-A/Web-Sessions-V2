import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory as updateCategoryApi } from "@/services/apiCategories";
import toast from "react-hot-toast";

function useUpdateCategory() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateCategory } = useMutation({
    mutationFn: updateCategoryApi,
    onSuccess: () => {
      toast.success("Category updated succesfully");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateCategory };
}

export { useUpdateCategory };
