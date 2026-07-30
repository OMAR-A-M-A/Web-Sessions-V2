import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSolution as deleteSolutionApi } from "@/services/apiTaskSolutions";
import toast from "react-hot-toast";

export function useDeleteSolution() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteSolution } = useMutation({
    mutationFn: (solutionId: string) => deleteSolutionApi(solutionId),
    onSuccess: () => {
      toast.success("Solution deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["task"],
      });
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isDeleting, deleteSolution };
}
