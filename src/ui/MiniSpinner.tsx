// src/components/ui/MiniSpinner.tsx
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/helpers";

interface MiniSpinnerProps {
  className?: string;
}

export function MiniSpinner({ className }: MiniSpinnerProps) {
  return (
    <Loader2 className={cn("h-4 w-4 animate-spin text-current", className)} />
  );
}
