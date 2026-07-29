import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask as updateTaskApi } from "@/services/apiTasks";
import type { TaskInput } from "@/types/TaskTypes";
import toast from "react-hot-toast";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateTask } = useMutation({
    mutationFn: ({
      id,
      updatedTask,
    }: {
      id: string;
      updatedTask: Partial<TaskInput>;
    }) => updateTaskApi({ id, updatedTask }),
    onSuccess: () => {
      toast.success("Task updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isUpdating, updateTask };
}
