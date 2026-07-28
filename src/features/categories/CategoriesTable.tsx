import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { Switch } from "@/ui/switch";
import { Button } from "@/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import TechIcon from "@/ui/TechIcon";
import { Modal } from "@/ui/Modal";
import { ConfirmDelete } from "@/ui/ConfirmDelete";
import { useDeleteCategory } from "./hooks/useDeleteCategory";
import { useUpdateCategory } from "./hooks/useUpdateCategory";
import { CategoryForm } from "./CategoryForm";
import type { CategoryWithDetails } from "@/types/categoryTypes";
interface CategoriesTableProps {
  categories: CategoryWithDetails[] | undefined;
}
export default function CategoriesTable({
  categories,
}: CategoriesTableProps) {
  const { deleteCategory, isDeleting } = useDeleteCategory();
  const { isUpdating, updateCategory } = useUpdateCategory();
  if (!categories?.length)
    return (
      <p className="flex items-center justify-center">
        No categories start add one
      </p>
    );
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[5%] text-center">#</TableHead>
          <TableHead className="w-[5%] text-center">Icon</TableHead>
          <TableHead className="w-[15%] text-center">Category</TableHead>
          <TableHead className="w-[15%] text-center">Slug</TableHead>
          <TableHead className="w-[15%] text-center">Color</TableHead>
          <TableHead className="w-[12%] text-center">Sessions</TableHead>
          <TableHead className="w-[12%] text-center">Tasks</TableHead>
          <TableHead className="w-[10%] text-center">Visible</TableHead>
          <TableHead className="w-[11%] text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories?.map((category, index) => (
          <TableRow key={category.id}>
            <Modal>
              <TableCell className="font-medium text-slate-500 text-center">
                {index + 1}
              </TableCell>

              <TableCell>
                <div className="flex justify-center">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800/50"
                    style={{ color: category.categoryColor }}
                  >
                    <TechIcon techName={category.slug} className="h-5 w-5" />
                  </div>
                </div>
              </TableCell>

              <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-center">
                {category.name}
              </TableCell>

              <TableCell className="text-slate-600 dark:text-slate-400 text-center">
                {category.slug}
              </TableCell>

              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: category.categoryColor }}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {category.categoryColor}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-slate-600 dark:text-slate-400 text-center">
                {category.sessions == 0 ? "—" : category.sessions}
              </TableCell>

              <TableCell className="text-slate-600 dark:text-slate-400 text-center">
                {category.tasks == 0 ? "—" : category.tasks}
              </TableCell>

              <TableCell>
                <div className="flex justify-center">
                  <Switch
                    checked={category.isVisible}
                    disabled={isUpdating}
                    onCheckedChange={() =>
                      updateCategory({
                        id: category.id,
                        updatedData: { isVisible: !category.isVisible },
                      })
                    }
                  />
                </div>
              </TableCell>

              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Modal.Open opens="edit-category">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Modal.Open>
                  <Modal.Open opens="delete-category">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </Modal.Open>
                  <Modal.Window
                    name="delete-category"
                    title="Delete Category"
                    description="Think before you click delete"
                    className="max-w-lg"
                  >
                    <ConfirmDelete
                      resourceName="category"
                      disabled={isDeleting}
                      onConfirm={() => deleteCategory(category.id)}
                    />
                  </Modal.Window>
                  <Modal.Window
                    className="w-2xl"
                    name="edit-category"
                    title="edit"
                    description="there a form you can edit from"
                  >
                    <CategoryForm categoryToEdit={category} />
                  </Modal.Window>
                </div>
              </TableCell>
            </Modal>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
