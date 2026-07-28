import FeedbackCard from "@/features/feedbacks/FeedbackCard";
import FeedbacksOperations from "@/features/feedbacks/FeedbacksOperations";
import { useFeedbacks } from "@/features/feedbacks/hooks/useFeedbacks";
import Pagination from "@/ui/Pagination";
import { Spinner } from "@/ui/Spinner";

export default function ManageFeedbacks() {
  const { feedbacks, isLoadingFeedbacks, count } = useFeedbacks();
  if (isLoadingFeedbacks) return <Spinner />;
  return (
    <div className="divide-y dark:divide-slate-800 divide-slate-200">
      <FeedbacksOperations />
      {feedbacks?.length ? (
        <div>
          {feedbacks?.map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
      ) : (
        <p className="text-center my-36">There is no feedbacks</p>
      )}
      <Pagination count={count} pageSize={5} />
    </div>
  );
}
