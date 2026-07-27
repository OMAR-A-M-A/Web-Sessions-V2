import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSession as deleteSessionApi } from "@/services/apiSessions";
import toast from "react-hot-toast";

function useDeleteSession() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteSession } = useMutation({
    mutationFn: deleteSessionApi,
    onSuccess: () => {
      toast.success("Session deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["sessions"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  
  return { isDeleting, deleteSession };
}

export { useDeleteSession };
