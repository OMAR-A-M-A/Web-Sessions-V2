import { useGetCategoryOptions } from "@/features/categories/hooks/useGetCategoryOptions";
import Filter from "@/ui/Filter";
import { Spinner } from "@/ui/Spinner";
function SessionsOperations() {
  const { isLoadingCategoryOptions, options } = useGetCategoryOptions();
  if (isLoadingCategoryOptions) return <Spinner />;
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
    </div>
  );
}

export default SessionsOperations;
