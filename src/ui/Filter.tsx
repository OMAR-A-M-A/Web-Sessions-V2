import { useSearchParams } from "react-router-dom";

export interface FilterOption {
  label: string;
  value: string;
}

interface FilterProps {
  filterName: string;
  options: FilterOption[] | undefined;
  variant?: "select" | "buttons";
}

export default function Filter({
  filterName,
  options,
  variant = "select",
}: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current filter value from URL, or default to the first option
  const currentFilter = searchParams.get(filterName) || "all";

  function handleChange(value: string) {
    searchParams.set(filterName, value);

    // When changing filters, it's a good practice to reset the pagination to page 1
    if (searchParams.get("page")) {
      searchParams.set("page", "1");
    }

    setSearchParams(searchParams);
  }

  // 1. Buttons Variant Styling
  if (variant === "buttons") {
    return (
      <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-100 p-1 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        {options?.map((option) => {
          const isActive = option.value === currentFilter;
          return (
            <button
              key={option.value}
              onClick={() => handleChange(option.value)}
              disabled={isActive}
              className={`rounded-sm px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-yellow-500 text-slate-900 shadow-sm font-bold"
                  : "text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }

  // 2. Select Variant Styling
  return (
    <div className="flex items-center gap-2">
      <select
        value={currentFilter}
        onChange={(e) => handleChange(e.target.value)}
        className="flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      >
        {filterName === "category" && (
          <option key="all" value="all">
            All
          </option>
        )}
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
