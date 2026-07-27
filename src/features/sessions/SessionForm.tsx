import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sessionSchema, type SessionFormData } from "./sessionSchema";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { FormRow } from "@/ui/FormRow";
import { useUpdateSession } from "./hooks/useUpdateSession";
import { useCreateSession } from "./hooks/useCreateSession";
import { MiniSpinner } from "@/ui/MiniSpinner";
import { useGetCategoryOptions } from "@/features/categories/hooks/useGetCategoryOptions";
import type { Session } from "@/types/sessionsTypes";

interface SessionFormProps {
  sessionToEdit?: Session;
  onCloseModal?: () => void;
  count?: number | undefined | null;
}

export function SessionForm({
  sessionToEdit,
  onCloseModal,
  count = 0,
}: SessionFormProps) {
  const { isUpdating, updateSession } = useUpdateSession();
  const { isCreating, createSession } = useCreateSession();
  const { options, isLoadingCategoryOptions } = useGetCategoryOptions();

  const isEditSession = Boolean(sessionToEdit?.id);

  const defaultDate = sessionToEdit?.publishDate
    ? new Date(sessionToEdit.publishDate).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(sessionSchema),
    defaultValues: sessionToEdit
      ? {
          category_id: sessionToEdit.category_id,
          title: sessionToEdit.title,
          description: sessionToEdit.description || "",
          notion_url: sessionToEdit.notion_url || "",
          display_order: sessionToEdit.display_order,
          estimated_reading_time: sessionToEdit.estimated_reading_time || 0,
          publishDate: defaultDate,
          is_visible: sessionToEdit.is_visible,
        }
      : {
          category_id: "",
          title: "",
          description: "",
          notion_url: "",
          display_order: (count ?? 0) + 1,
          estimated_reading_time: 0,
          publishDate: defaultDate,
          is_visible: true,
        },
  });

  function onSubmit(data: SessionFormData) {
    const imageFile =
      typeof data.cover_image === "string"
        ? null
        : data.cover_image?.[0] || null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cover_image, ...sessionData } = data;

    if (isEditSession) {
      updateSession(
        { id: sessionToEdit?.id, updatedSession: sessionData, imageFile },
        {
          onSettled: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      createSession(
        { newSession: sessionData, imageFile },
        {
          onSettled: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    }
  }

  const isWorking = isSubmitting || isUpdating || isCreating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
      <FormRow
        label="Cover Image"
        error={errors.cover_image?.message as string}
        htmlFor="cover_image"
      >
        <div className="relative flex w-full items-center justify-center rounded-md border-2 border-dashed border-slate-300 bg-slate-50 px-3 py-6 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800/50">
          <Input
            id="cover_image"
            type="file"
            accept="image/*"
            disabled={isWorking}
            className={`w-full h-fit cursor-pointer bg-transparent file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-yellow-500 file:px-4 file:py-2 file:text-sm file:font-bold file:text-slate-900 hover:file:bg-yellow-600 ${
              errors.cover_image ? "border-red-500" : "border-0 shadow-none"
            }`}
            {...register("cover_image")}
          />
        </div>
      </FormRow>

      <FormRow
        label="Technology"
        error={errors.category_id?.message as string}
        htmlFor="category_id"
      >
        <select
          id="category_id"
          disabled={isWorking || isLoadingCategoryOptions}
          className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 ring-offset-background placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400 ${
            errors.category_id ? "border-red-500" : ""
          }`}
          {...register("category_id")}
        >
          <option value="">Select a technology</option>
          {options?.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow
        label="Title"
        error={errors.title?.message as string}
        htmlFor="title"
      >
        <Input
          id="title"
          placeholder="Session title"
          disabled={isWorking}
          className={errors.title ? "border-red-500" : ""}
          {...register("title")}
        />
      </FormRow>

      <FormRow
        label="Description (Optional)"
        error={errors.description?.message as string}
        htmlFor="description"
      >
        <Input
          id="description"
          placeholder="Brief description of this session..."
          disabled={isWorking}
          className={errors.description ? "border-red-500" : ""}
          {...register("description")}
        />
      </FormRow>

      <FormRow
        label="Notion URL"
        error={errors.notion_url?.message as string}
        htmlFor="notion_url"
      >
        <Input
          id="notion_url"
          placeholder="https://notion.so/..."
          disabled={isWorking}
          className={errors.notion_url ? "border-red-500" : ""}
          {...register("notion_url")}
        />
      </FormRow>

      <div className="grid grid-cols-2 gap-4">
        <FormRow
          label="Display Order"
          error={errors.display_order?.message as string}
          htmlFor="display_order"
        >
          <Input
            id="display_order"
            type="number"
            disabled={isWorking}
            className={errors.display_order ? "border-red-500" : ""}
            {...register("display_order")}
          />
        </FormRow>

        <FormRow
          label="Read Time (Min)"
          error={errors.estimated_reading_time?.message as string}
          htmlFor="estimated_reading_time"
        >
          <Input
            id="estimated_reading_time"
            type="number"
            disabled={isWorking}
            className={errors.estimated_reading_time ? "border-red-500" : ""}
            {...register("estimated_reading_time")}
          />
        </FormRow>
      </div>

      <FormRow
        label="Publish Date"
        error={errors.publishDate?.message as string}
        htmlFor="publishDate"
      >
        <Input
          id="publishDate"
          type="date"
          disabled={isWorking}
          className={`block w-full dark:scheme-dark ${
            errors.publishDate ? "border-red-500" : ""
          }`}
          {...register("publishDate")}
        />
      </FormRow>

      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="is_visible"
          disabled={isWorking}
          className="h-4 w-4 cursor-pointer rounded border-slate-300 text-yellow-500 focus:ring-yellow-500 dark:border-slate-700 dark:bg-slate-900"
          {...register("is_visible")}
        />
        <Label htmlFor="is_visible" className="cursor-pointer">
          Visible on public site
        </Label>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            reset();
            onCloseModal?.();
          }}
          disabled={isWorking}
          className="w-24"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isWorking}
          className="w-32 bg-yellow-500 font-bold text-slate-900 hover:bg-yellow-600"
        >
          {isWorking ? (
            <MiniSpinner />
          ) : isEditSession ? (
            "Save Changes"
          ) : (
            "Add Session"
          )}
        </Button>
      </div>
    </form>
  );
}
