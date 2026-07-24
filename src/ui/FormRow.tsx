// src/components/ui/FormRow.tsx
import React from "react";
import { Label } from "@/ui/label";
import { cn } from "@/utils/helpers";

interface FormRowProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}

export function FormRow({
  label,
  error,
  children,
  htmlFor,
  className,
}: FormRowProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label
          htmlFor={htmlFor}
          className={
            error
              ? "text-red-500 dark:text-red-400"
              : "text-slate-700 dark:text-slate-300"
          }
        >
          {label}
        </Label>
      )}

      {children}

      {error && (
        <span className="text-xs font-medium text-red-500 dark:text-red-400">
          {error}
        </span>
      )}
    </div>
  );
}
