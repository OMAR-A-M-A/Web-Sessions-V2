import { useUpdateFeedback } from "./hooks/useUpdateFeedback";
import { useDeleteFeedback } from "./hooks/useDeleteFeedback";
import { Modal } from "@/ui/Modal";
import { ConfirmDelete } from "@/ui/ConfirmDelete";
import type { Feedback } from "@/types/feedbackTypes";
import { Button } from "@/ui/button";
import { X } from "lucide-react";
import clsx from "clsx";
import { MiniSpinner } from "@/ui/MiniSpinner";

interface FeedbackUpdateActionsProps {
  feedback: Feedback;
}

export default function FeedbackUpdateActions({
  feedback,
}: FeedbackUpdateActionsProps) {
  const { updateFeedback, isUpdating } = useUpdateFeedback();
  const { deleteFeedback, isDeleting } = useDeleteFeedback();

  const handleToggleRead = () => {
    updateFeedback({
      id: feedback.id,
      updatedFeedback: { is_read: !feedback.is_read },
    });
  };

  const handleTogglePublished = () => {
    updateFeedback({
      id: feedback.id,
      updatedFeedback: { is_published: !feedback.is_published },
    });
  };

  return (
    <div className="flex items-center gap-2 border py-1 px-2 rounded-sm">
      <button
        onClick={handleToggleRead}
        disabled={isUpdating}
        className={clsx(
          "rounded border bg-transparent px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-50 cursor-pointer ",
          {
            "border-amber-500/20 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20":
              feedback.is_read,
            "text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 border-slate-200":
              !feedback.is_read,
          },
        )}
      >
        {isUpdating ? <MiniSpinner /> : feedback.is_read ? "Unread" : "Read"}
      </button>

      <button
        onClick={handleTogglePublished}
        disabled={isUpdating}
        className={clsx(
          "rounded border px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-50 cursor-pointer",
          {
            "border-emerald-500/20 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20":
              feedback.is_published,
            "border-slate-200 bg-transparent text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800":
              !feedback.is_published,
          },
        )}
      >
        {isUpdating ? (
          <MiniSpinner />
        ) : feedback.is_published ? (
          "Published"
        ) : (
          "Publish"
        )}
      </button>

      <Modal>
        <Modal.Open opens="delete-feedback">
          <Button
            size={"icon"}
            className="h-7 w-7 p-1 rounded text-slate-400 bg-transparent hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-800"
          >
            <X />
          </Button>
        </Modal.Open>
        <Modal.Window
          name="delete-feedback"
          title="Delete Feedback"
          className="w-2xl"
        >
          <ConfirmDelete
            resourceName="feedback"
            disabled={isDeleting}
            onConfirm={() => deleteFeedback(feedback.id)}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
}
