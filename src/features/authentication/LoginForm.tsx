import { useState } from "react";
import { useLogin } from "@/features/authentication/hooks/useLogin";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { MiniSpinner } from "@/ui/MiniSpinner";

export default function LoginForm() {
  const [email, setEmail] = useState("oa5252842@gmail.com");
  const [password, setPassword] = useState("omar011");

  const { login, isPending } = useLogin();

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
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
  );
}
