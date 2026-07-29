import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask as deleteTaskApi } from "@/services/apiTasks";
import toast from "react-hot-toast";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteTask } = useMutation({
    mutationFn: (id: string) => deleteTaskApi(id),
    onSuccess: () => {
      toast.success("Task deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isDeleting, deleteTask };
}
