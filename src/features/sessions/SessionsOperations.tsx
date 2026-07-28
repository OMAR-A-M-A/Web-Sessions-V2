import { useGetCategoryOptions } from "@/features/categories/hooks/useGetCategoryOptions";
import Filter from "@/ui/Filter";
import SortBy from "@/ui/SortBy";
import { MiniSpinner } from "@/ui/MiniSpinner";

function SessionsOperations() {
  const { isLoadingCategoryOptions, options } = useGetCategoryOptions();
  
  if (isLoadingCategoryOptions) return <MiniSpinner />;
  
  return (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-2">
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
