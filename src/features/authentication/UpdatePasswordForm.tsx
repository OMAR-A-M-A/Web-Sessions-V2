import { useState } from "react";
import { useUpdateUser } from "./hooks/useUpdatedUser";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { FormRow } from "@/ui/FormRow";
import { MiniSpinner } from "@/ui/MiniSpinner";

export function UpdatePasswordForm() {
  const { updateUser, isUpdating } = useUpdateUser();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!password || !passwordConfirm) {
      setError("Please fill in both fields");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    updateUser(
      { password },
      {
        onSuccess: () => {
          setPassword("");
          setPasswordConfirm("");
          setError("");
        },
      },
    );
  }

  function handleCancel() {
    setPassword("");
    setPasswordConfirm("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-10 w-full">
      <h3 className="text-xl font-semibold mb-6 text-slate-800 dark:text-slate-200">
        Update password
      </h3>
      <div className="divide-y divide-slate-200 dark:divide-slate-800">
        <FormRow
          label="Password (min 8 characters)"
          error={
            error && password.length > 0 && password.length < 8
              ? "Must be at least 8 chars"
              : ""
          }
          className="grid grid-cols-1 md:grid-cols-[240px_1fr_1fr] items-center gap-4 py-5 space-y-0"
        >
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isUpdating}
            className="max-w-md"
          />
        </FormRow>

        <FormRow
          label="Confirm password"
          error={error}
          className="grid grid-cols-1 md:grid-cols-[240px_1fr_1fr] items-center gap-4 py-5 space-y-0"
        >
          <Input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            disabled={isUpdating}
            className="max-w-md"
          />
        </FormRow>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr_1fr] items-center gap-4 py-5 space-y-0">
          <div className="md:col-end-13 flex gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={isUpdating}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? <MiniSpinner /> : "Update password"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
