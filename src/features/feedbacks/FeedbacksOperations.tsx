import Filter from "@/ui/Filter";
import SortBy from "@/ui/SortBy";
const readOptions = [
  { value: "all", label: "All" },
  { value: "false", label: "Unread" },
  { value: "true", label: "Read" },
];
const categoryOptions = [
  { value: "all", label: "All" },
  { value: "suggestion", label: "Suggestion" },
  { value: "bug_report", label: "Bug Report" },
  { value: "feature_request", label: "Feature Request" },
  { value: "general_feedback", label: "General Feedback" },
  { value: "other", label: "Other" },
];
const sortByOptions = [
  { value: "created_at-desc", label: "Sort by Date (Recent first)" },
  { value: "created_at-asc", label: "Sort by Date (Oldest first)" },
  { value: "rating-desc", label: "Sort by Rating (Highest first)" },
  { value: "rating-asc", label: "Sort by Rating (Lowest first)" },
];
function FeedbacksOperations() {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex items-center gap-4">
        <Filter
          filterName="category"
          variant="buttons"
          options={categoryOptions}
        />
        <Filter filterName="is_read" variant="buttons" options={readOptions} />
      </div>

      <SortBy options={sortByOptions} />
    </div>
  );
}

export default FeedbacksOperations;
