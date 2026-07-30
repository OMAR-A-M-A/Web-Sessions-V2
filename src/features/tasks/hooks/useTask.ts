import { useQuery } from "@tanstack/react-query";
import { getTask } from "@/services/apiTasks";
import { useParams } from "react-router-dom";

export function useTask(id?: string) {
  const { taskId } = useParams();
  const targetId = id || taskId;

  const {
    data: task,
    isPending: isLoadingTask,
    error,
  } = useQuery({
    queryKey: ["task", targetId],
    queryFn: () => getTask(targetId!),
    retry: false,
    enabled: !!targetId
  });

  return { task, isLoadingTask, error };
}
