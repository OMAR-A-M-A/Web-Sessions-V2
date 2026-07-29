import { useQuery } from "@tanstack/react-query";
import { getTask } from "@/services/apiTasks";
import { useParams } from "react-router-dom";

export function useTask() {
  const { taskId } = useParams();

  const {
    data: task,
    isPending: isLoadingTask,
    error,
  } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTask(taskId!),
    retry: false,
  });

  return { task, isLoadingTask, error };
}
