import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSolution as createSolutionApi } from "@/services/apiTaskSolutions";
import toast from "react-hot-toast";

export function useCreateSolution() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createSolution } = useMutation({
    mutationFn: (args: Parameters<typeof createSolutionApi>[0]) =>
      createSolutionApi(args),
    onSuccess: () => {
      toast.success("Solution created successfully");
      queryClient.invalidateQueries({
        queryKey: ["task"],
      });
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isCreating, createSolution };
}
