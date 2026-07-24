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
import { Logo } from "@/ui/Logo";

export default function Login() {
  const [email, setEmail] = useState("oa5252842@gmail.com");
  const [password, setPassword] = useState("omar011");

  const { login, isPending } = useLogin();

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
          <Logo />
          <CardTitle className="text-2xl font-bold tracking-tight mt-2">
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
                disabled={isPending}
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
                disabled={isPending}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <MiniSpinner className="mr-2" /> : null}
              Sign In
            </Button>
          </form>

        </CardContent>
      </Card>
    </div>
  );
}
