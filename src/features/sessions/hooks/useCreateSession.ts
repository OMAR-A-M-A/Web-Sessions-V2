import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSession as createSessionApi } from "@/services/apiSessions";
import type { SessionInput } from "@/types/sessionsTypes";
import toast from "react-hot-toast";

export function useCreateSession() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createSession } = useMutation({
    mutationFn: ({
      newSession,
      imageFile,
    }: {
      newSession: SessionInput;
      imageFile?: File | null;
    }) => createSessionApi(newSession, imageFile),
    onSuccess: () => {
      toast.success("Session created successfully");
      queryClient.invalidateQueries({
        queryKey: ["sessions"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createSession };
}
