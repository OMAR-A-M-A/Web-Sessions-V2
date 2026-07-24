// src/pages/auth/Login.tsx
import { useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { useLogin } from "@/features/authentication/hooks/useLogin";
import { MiniSpinner } from "@/ui/MiniSpinner";
import { SiGithub, SiGmail } from "react-icons/si";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isPending, loginOAuth, isOAuthPending } = useLogin();

  const isLoading = isPending || isOAuthPending;

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => setPassword(""),
      },
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 transition-colors duration-300 dark:bg-[#0B1120]">
      <Card className="w-full max-w-md p-8 space-y-10">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Admin Panel Access
          </CardTitle>
          <CardDescription>
            Enter your credentials to manage the platform
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isPending ? <MiniSpinner className="mr-2" /> : null}
              Sign In
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500 dark:bg-slate-900 dark:text-slate-400 transition-colors">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              onClick={() => loginOAuth("github")}
            >
              <SiGithub className="mr-2 h-5 w-5 text-black" />
              GitHub
            </Button>

            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              onClick={() => loginOAuth("google")}
            >
              <SiGmail className="mr-2 h-5 w-5 text-red-800" />
              Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
