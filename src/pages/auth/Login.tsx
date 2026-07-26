import { useUser } from "@/features/authentication/hooks/useUser";
import LoginForm from "@/features/authentication/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";

import { Logo } from "@/ui/Logo";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 transition-colors duration-300 dark:bg-[#0B1120]">
      <Card className="w-full max-w-md p-8 space-y-10">
        <CardHeader className="space-y-1 text-center">
          <Logo />
          <CardTitle className="text-2xl font-bold tracking-tight mt-2">
            Admin Panel Access
          </CardTitle>
          <CardDescription>
            Enter your credentials to manage the platform
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
