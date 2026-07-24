// src/features/auth/useLogin.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginWithEmail, loginWithProvider } from "@/services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginWithEmail,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/admin/dashboard", { replace: true });
      toast.success("Welcome back!");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Incorrect email or password");
    },
  });

  const { mutate: loginOAuth, isPending: isOAuthPending } = useMutation({
    mutationFn: loginWithProvider,
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Failed to login with provider");
    },
  });

  return { login, isPending, loginOAuth, isOAuthPending };
}
