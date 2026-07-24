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
import { useCategories } from "./hooks/useCategories";
import { Spinner } from "@/ui/Spinner";


export default function CategoriesTable() {
  const { categories, isLoadingCategories } = useCategories();
  if (isLoadingCategories) return <Spinner />;
  console.log(categories);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[5%]">#</TableHead>
          <TableHead className="w-[20%]">Category</TableHead>
          <TableHead className="w-[15%]">Slug</TableHead>
          <TableHead className="w-[15%]">Color</TableHead>
          <TableHead className="w-[12%]">Sessions</TableHead>
          <TableHead className="w-[12%]">Tasks</TableHead>
          <TableHead className="w-[10%]">Visible</TableHead>
          <TableHead className="w-[11%] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories?.map((category, index) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium text-slate-500">
              {index + 1}
            </TableCell>

            <TableCell>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800/50"
                  style={{ color: category.categoryColor }}
                >
                  <TechIcon techName={category.slug} className="h-5 w-5" />
                </div>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {category.name}
                </span>
              </div>
            </TableCell>

            <TableCell className="text-slate-600 dark:text-slate-400">
              {category.slug}
            </TableCell>

            <TableCell>
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: category.categoryColor }}
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {category.categoryColor}
                </span>
              </div>
            </TableCell>

            <TableCell className="text-slate-600 dark:text-slate-400">
              {category.sessions}
            </TableCell>

            <TableCell className="text-slate-600 dark:text-slate-400">
              {category.tasks}
            </TableCell>

            <TableCell>
              <Switch checked={category.isVisible} />
            </TableCell>

            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
