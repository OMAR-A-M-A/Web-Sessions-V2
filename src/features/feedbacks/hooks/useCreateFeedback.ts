import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFeedback as createFeedbackApi } from "@/services/apiFeedbacks";
import toast from "react-hot-toast";

export function useCreateFeedback() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createFeedback } = useMutation({
    mutationFn: createFeedbackApi,
    onSuccess: () => {
      toast.success("Feedback submitted successfully");
      queryClient.invalidateQueries({
        queryKey: ["feedbacks"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createFeedback };
}
