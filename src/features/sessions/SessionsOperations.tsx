import { useGetCategoryOptions } from "@/features/categories/hooks/useGetCategoryOptions";
import Filter from "@/ui/Filter";
import SortBy from "@/ui/SortBy";
import { MiniSpinner } from "@/ui/MiniSpinner";

function SessionsOperations() {
  const { isLoadingCategoryOptions, options } = useGetCategoryOptions();

  if (isLoadingCategoryOptions) return <MiniSpinner />;

  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          Filter by category:
          <Filter filterName="category" options={options} />
        </div>
        <Filter
          filterName="is_visible"
          variant="buttons"
          options={[
            { value: "all", label: "All" },
            { value: "true", label: "Visible" },
            { value: "false", label: "Not Visible" },
          ]}
        />
      </div>

      <SortBy
        options={[
          { value: "display_order-asc", label: "Sort by Order (Asc)" },
          { value: "display_order-desc", label: "Sort by Order (Desc)" },
          { value: "publishDate-desc", label: "Sort by Date (Recent first)" },
          { value: "publishDate-asc", label: "Sort by Date (Oldest first)" },
          { value: "title-asc", label: "Sort by Title (A-Z)" },
          { value: "title-desc", label: "Sort by Title (Z-A)" },
        ]}
      />
    </div>
  );
}

export default SessionsOperations;
