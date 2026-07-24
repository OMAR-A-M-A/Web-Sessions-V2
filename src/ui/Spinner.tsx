// src/components/ui/Spinner.tsx
import { cn } from "@/utils/helpers";

interface SpinnerProps {
  className?: string;
  containerClassName?: string;
}

export function Spinner({ className, containerClassName }: SpinnerProps) {
  return (
    // Container to center the spinner
    <div
      className={cn(
        "flex min-h-[70vh] w-full items-center justify-center",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-yellow-500 dark:border-slate-800 dark:border-t-yellow-500",
          className,
        )}
      />
    </div>
  );
}
