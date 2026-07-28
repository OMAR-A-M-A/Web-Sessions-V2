import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory as deleteCategoryApi } from "@/services/apiCategories";
import toast from "react-hot-toast";

function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCategory } = useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCategory };
}

export { useDeleteCategory };
