import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSession as updateSessionApi } from "@/services/apiSessions";
import toast from "react-hot-toast";

function useUpdateSession() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSession } = useMutation({
    mutationFn: updateSessionApi,
    onSuccess: () => {
      toast.success("Session updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["sessions"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSession };
}

export { useUpdateSession };
