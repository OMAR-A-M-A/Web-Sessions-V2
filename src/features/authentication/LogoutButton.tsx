// src/features/auth/LogoutButton.tsx
import { LogOut } from "lucide-react";
import { useLogout } from "@/features/authentication/hooks/useLogout";
import { Button } from "@/ui/button";
import { MiniSpinner } from "@/ui/MiniSpinner";

export function LogoutButton() {
  const { logout, isPending } = useLogout();

  return (
    <Button
      variant="ghost"
      size="default"
      onClick={() => logout()}
      disabled={isPending}
      className=" text-slate-500 hover:bg-slate-100 hover:text-red-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-red-400"
      title="Logout"
    >
      {isPending ? (
        <MiniSpinner />
      ) : (
        <span className="flex items-center gap-1">
          <LogOut className="h-4 w-4" /> Logout
        </span>
      )}
    </Button>
  );
}
