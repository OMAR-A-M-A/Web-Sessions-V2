import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSolution as updateSolutionApi } from "@/services/apiTaskSolutions";
import toast from "react-hot-toast";

export function useUpdateSolution() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSolution } = useMutation({
    mutationFn: (args: Parameters<typeof updateSolutionApi>[0]) =>
      updateSolutionApi(args),
    onSuccess: () => {
      toast.success("Solution updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["task"],
      });
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isUpdating, updateSolution };
}
