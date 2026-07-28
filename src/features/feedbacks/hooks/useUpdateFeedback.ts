import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeedback as updateFeedbackApi } from "@/services/apiFeedbacks";
import toast from "react-hot-toast";

export function useUpdateFeedback() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateFeedback } = useMutation({
    mutationFn: updateFeedbackApi,
    onSuccess: () => {
      toast.success("Feedback updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["feedbacks"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateFeedback };
}
