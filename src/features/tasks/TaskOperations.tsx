import { useGetCategoryOptions } from "@/features/categories/hooks/useGetCategoryOptions";
import Filter from "@/ui/Filter";
import SortBy from "@/ui/SortBy";
import { MiniSpinner } from "@/ui/MiniSpinner";

const visibilityOptions = [
  { value: "all", label: "All" },
  { value: "true", label: "Visible" },
  { value: "false", label: "Not Visible" },
];

const taskTypeOptions = [
  { value: "all", label: "All Types" },
  { value: "coding", label: "Coding" },
  { value: "research", label: "Research" },
];

const sortOptions = [
  { value: "created_at-desc", label: "Sort by Date (Recent first)" },
  { value: "created_at-asc", label: "Sort by Date (Oldest first)" },
  { value: "title-asc", label: "Sort by Title (A-Z)" },
  { value: "title-desc", label: "Sort by Title (Z-A)" },
];

function TaskOperations() {
  const { isLoadingCategoryOptions, options: categoryOptions } = useGetCategoryOptions();

  if (isLoadingCategoryOptions) return <MiniSpinner />;

  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200">
          Filter by category:
          <Filter filterName="category" options={categoryOptions || []} />
        </div>
        
        <Filter
          filterName="task_type"
          variant="buttons"
          options={taskTypeOptions}
        />

        <Filter
          filterName="is_visible"
          variant="buttons"
          options={visibilityOptions}
        />
      </div>

      <SortBy options={sortOptions} />
    </div>
  );
}

export default TaskOperations;
