// src/features/auth/useUser.ts
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/apiAuth";
import type { AppUser } from "@/types/userTypes";

export function useUser() {
  const { isPending:isLoadingUser, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isLoadingUser,
    user: user as AppUser | undefined | null,
    isAuthenticated: user?.role === "authenticated",
  };
}
