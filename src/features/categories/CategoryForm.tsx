import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, type CategoryFormData } from "./categorySchema";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { type Category } from "@/types/categoryTypes";
import { FormRow } from "@/ui/FormRow";
import { useUpdateCategory } from "./hooks/useUpdateCategory";
import { MiniSpinner } from "@/ui/MiniSpinner";
import { useCreateCategory } from "./hooks/useCreateCategory";

interface CategoryFormProps {
  categoryToEdit?: Category;
  onCloseModal?: () => void;
  count?: number | null;
}

export function CategoryForm({
  categoryToEdit,
  onCloseModal,
  count,
}: CategoryFormProps) {
  const { isUpdating, updateCategory } = useUpdateCategory();
  const { isCreating, createCategory } = useCreateCategory();
  const isEditSession = Boolean(categoryToEdit?.id);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: categoryToEdit
      ? {
          name: categoryToEdit.name,
          slug: categoryToEdit.slug,
          categoryColor: categoryToEdit.categoryColor,
          isVisible: categoryToEdit.isVisible,
          description: categoryToEdit.description || "",
          displayOrder: categoryToEdit.displayOrder,
        }
      : {
          name: "",
          slug: "",
          categoryColor: "#3B82F6",
          isVisible: true,
          description: "",
          displayOrder: (count ?? 0) + 1,
        },
  });
  const currentColor = useWatch({
    control,
    name: "categoryColor",
  });
  const onSubmit = (data: CategoryFormData) => {
    if (categoryToEdit) {
      updateCategory(
        { id: categoryToEdit.id, updatedData: data },
        { onSettled: onCloseModal },
      );
    } else {
      createCategory(data, { onSettled: onCloseModal });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
      <div className="grid grid-cols-2 gap-4">
        {/* Name Field */}
        <FormRow
          label="Category Name"
          error={errors.name?.message as string}
          htmlFor="name"
        >
          <Input
            id="name"
            placeholder="e.g., React.js"
            disabled={isSubmitting}
            className={errors.name ? "border-red-500" : ""}
            {...register("name")}
          />
        </FormRow>

        {/* Slug Field */}
        <FormRow
          label="Slug (URL path)"
          error={errors.slug?.message as string}
          htmlFor="slug"
        >
          <Input
            id="slug"
            placeholder="e.g., react-js"
            disabled={isSubmitting}
            className={errors.slug ? "border-red-500" : ""}
            {...register("slug")}
          />
        </FormRow>
      </div>

      {/* Description Field */}
      <FormRow
        label="Description (Optional)"
        error={errors.description?.message as string}
        htmlFor="description"
      >
        <Input
          id="description"
          placeholder="Brief description of this track..."
          disabled={isSubmitting}
          className={errors.description ? "border-red-500" : ""}
          {...register("description")}
        />
      </FormRow>

      <div className="grid grid-cols-2 gap-4">
        {/* Display Order Field */}
        <FormRow
          label="Display Order"
          error={errors.displayOrder?.message as string}
          htmlFor="displayOrder"
        >
          <Input
            id="displayOrder"
            type="number"
            disabled={isEditSession ? isSubmitting : true}
            className={errors.displayOrder ? "border-red-500" : ""}
            {...register("displayOrder")}
          />
        </FormRow>

        {/* Category Color Field */}
        <FormRow
          label="Theme Color"
          error={errors.categoryColor?.message as string}
          htmlFor="categoryColor"
        >
          <div className="flex items-center gap-3">
            <Input
              id="categoryColor"
              type="color"
              disabled={isSubmitting}
              className="h-10 w-16 cursor-pointer p-1"
              value={currentColor || "#000000"}
              onChange={(e) =>
                setValue("categoryColor", e.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            />
            <Input
              type="text"
              disabled={isSubmitting}
              className="w-full uppercase"
              placeholder="#000000"
              {...register("categoryColor")}
            />
          </div>
        </FormRow>
      </div>

      {/* Is Visible Field */}
      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="isVisible"
          disabled={isSubmitting}
          className="h-4 w-4 rounded border-slate-300 text-yellow-500 focus:ring-yellow-500 dark:border-slate-700 dark:bg-slate-900"
          {...register("isVisible")}
        />
        <Label htmlFor="isVisible" className="cursor-pointer">
          Visible on public site
        </Label>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            reset();
            onCloseModal?.();
          }}
          disabled={isSubmitting}
          className="w-24"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-32 bg-yellow-500 font-bold text-slate-900 hover:bg-yellow-600"
        >
          {isUpdating || isCreating ? (
            <MiniSpinner />
          ) : isEditSession ? (
            "Save Changes"
          ) : (
            "Create Category"
          )}
        </Button>
      </div>
    </form>
  );
}
