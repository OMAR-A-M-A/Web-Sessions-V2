// src/ui/ProtectedRoute.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/features/authentication/hooks/useUser";
import { Spinner } from "./Spinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { isLoadingUser, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoadingUser) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isLoadingUser, navigate]);

  if (isLoadingUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-[#0B1120]">
        <Spinner />
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return null;
}
