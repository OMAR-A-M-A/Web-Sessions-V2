import { useSearchParams } from "react-router-dom";

export interface FilterOption {
  label: string | undefined;
  value: string | undefined;
  method?: string;
}

interface FilterProps {
  filterName: string;
  options: FilterOption[] | undefined;
}

export default function Filter({ filterName, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current filter value from URL, or default to the first option
  const currentFilter = searchParams.get(filterName) || options?.[0]?.value;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set(filterName, e.target.value);

    // When changing filters, it's a good practice to reset the pagination to page 1
    if (searchParams.get("page")) {
      searchParams.set("page", "1");
    }

    setSearchParams(searchParams);
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={currentFilter}
        onChange={handleChange}
        className="flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      >
        {filterName === "category" && <option key="all" value="all">All</option>}
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
