import { cn } from "@/utils/helpers";
import { useSearchParams } from "react-router-dom";

export interface SortOption {
  label: string;
  value: string;
}

interface SortByProps {
  options: SortOption[];
  className?: string;
}

export default function SortBy({ options, className }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || options[0]?.value || "";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <select
      value={sortBy}
      onChange={handleChange}
      className={cn(
        "flex h-10 cursor-pointer items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
        className,
      )}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
