import {
  categoryColors,
  categoryLabels,
  type Feedback,
} from "@/types/feedbackTypes";
import StarRating from "@/ui/StarRating";
import clsx from "clsx";
import FeedbackUpdateActions from "./FeedbackUpdateActions";

interface FeedbackCardProps {
  feedback: Feedback;
}

function FeedbackCard({ feedback }: FeedbackCardProps) {
  const { name, email, rating, category, message, is_read, is_published } =
    feedback;

  return (
    <div
      className={clsx(
        "flex flex-col gap-2.5 rounded-lg border px-4 py-3 shadow-sm border-slate-200 my-3",
        {
          "bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60": !is_read,
          "bg-white dark:border-slate-800 dark:bg-[#0f172a]": is_read,
        },
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-wrap items-start gap-8">
          <div className="space-y-0.5">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {name}
            </h3>

            <span className="text-sm text-slate-500 dark:text-slate-400 italic">
              {email !== null ? email : "No email provided"}
            </span>
          </div>

          <div className="flex gap-4">
            <span
              className={`rounded border px-2 py-0.5 text-xs font-medium ${
                categoryColors[category] || categoryColors.other
              }`}
            >
              {categoryLabels[category] || category}
            </span>

            {is_published && (
              <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-500">
                Testimonial
              </span>
            )}
            {is_read && (
              <span className="rounded border border-amber-500/20 bg-amber-500/10 text-amber-500 px-2 py-0.5 text-xs font-medium">
                Readed
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center -mt-1">
          <StarRating
            defaultRating={rating}
            maxRating={5}
            size={16}
            color="#fcc419"
            isInteract={false}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="pl-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300 max-w-xl">
          {message !== null ? message : "The Visitor did not write a message"}
        </p>
        <FeedbackUpdateActions feedback={feedback} />
      </div>
    </div>
  );
}

export default FeedbackCard;
