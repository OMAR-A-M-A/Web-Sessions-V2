import { Button } from "@/ui/button";

interface ConfirmDeleteProps {
  resourceName: string;
  onConfirm: () => void;
  disabled?: boolean;
  onCloseModal?: () => void;
}

export function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmDeleteProps) {
  return (
    <div className="flex flex-col gap-4 pt-2">
      {/* Warning Text */}
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        Are you sure you want to delete this{" "}
        <strong className="text-slate-900 dark:text-slate-200">
          {resourceName}
        </strong>{" "}
        permanently? This action cannot be undone and will remove all associated
        data.
      </p>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={onCloseModal}
          className="w-24"
        >
          Cancel
        </Button>

        <Button
          type="button"
          variant="destructive"
          disabled={disabled}
          onClick={onConfirm}
          className="w-24"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
