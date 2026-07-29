import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask as createTaskApi } from "@/services/apiTasks";
import type { TaskInput } from "@/types/TaskTypes";
import toast from "react-hot-toast";

export function useCreateTask() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createTask } = useMutation({
    mutationFn: (newTask: TaskInput) => createTaskApi(newTask),
    onSuccess: () => {
      toast.success("Task created successfully");
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isCreating, createTask };
}
