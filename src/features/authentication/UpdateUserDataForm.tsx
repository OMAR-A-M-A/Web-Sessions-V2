import { useState, useEffect } from "react";
import { useUser } from "./hooks/useUser";
import { useUpdateUser } from "./hooks/useUpdatedUser";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { FormRow } from "@/ui/FormRow";
import { MiniSpinner } from "@/ui/MiniSpinner";

export function UpdateUserDataForm() {
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const { email } = user || {};
  const { full_name: currentFullName } = user?.user_metadata || {};

  const [fullName, setFullName] = useState(currentFullName || "");

  // Update local state if the user data changes remotely
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (currentFullName) setFullName(currentFullName);
  }, [currentFullName]);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fullName || fullName === currentFullName) return;
    updateUser({ fullName });
  }

  function handleCancel() {
    setFullName(currentFullName || "");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-10 w-full">
      <h3 className="text-xl font-semibold mb-6 text-slate-800 dark:text-slate-200">
        Update user data
      </h3>
      <div className="divide-y divide-slate-200 dark:divide-slate-800">
        <FormRow label="Email address" className="grid grid-cols-1 md:grid-cols-[240px_1fr_1fr] items-center gap-4 py-5 space-y-0">
          <Input
            value={email || ""}
            disabled
            className="bg-slate-100 dark:bg-slate-800 cursor-not-allowed text-slate-500 max-w-md"
          />
        </FormRow>
        
        <FormRow label="Full name" className="grid grid-cols-1 md:grid-cols-[240px_1fr_1fr] items-center gap-4 py-5 space-y-0">
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
              {isUpdating ? <MiniSpinner /> : "Update account"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
