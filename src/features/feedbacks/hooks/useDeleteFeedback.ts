import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFeedback as deleteFeedbackApi } from "@/services/apiFeedbacks";
import toast from "react-hot-toast";

export function useDeleteFeedback() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteFeedback } = useMutation({
    mutationFn: deleteFeedbackApi,
    onSuccess: () => {
      toast.success("Feedback deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["feedbacks"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  
  return { isDeleting, deleteFeedback };
}
