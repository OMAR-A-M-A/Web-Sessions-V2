import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "@/services/apiAuth";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
      toast.success("Logged out successfully");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("There was an error logging out");
    },
  });

  return { logout, isPending };
}
