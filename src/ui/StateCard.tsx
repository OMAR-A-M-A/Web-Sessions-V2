// src/pages/admin/components/CategoryStatCard.tsx
import { type ReactNode } from "react";

interface CategoryStatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
  iconBgColor?: string;
  iconTextColor?: string;
}

export default function StatCard({
  title,
  value,
  description,
  icon,
  iconBgColor = "bg-blue-100 dark:bg-blue-900/30",
  iconTextColor = "text-blue-600 dark:text-blue-400",
}: CategoryStatCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${iconBgColor} ${iconTextColor}`}
      >
        {icon}
      </div>

      <div className="flex flex-col">
        <span className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          {value}
        </span>
        <span className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
          {title}
        </span>
        <span className="mt-1 text-xs text-slate-500 dark:text-slate-500">
          {description}
        </span>
      </div>
    </div>
  );
}
