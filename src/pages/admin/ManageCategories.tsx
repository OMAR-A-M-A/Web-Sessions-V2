import { LayoutGrid, Eye, EyeOff, Plus } from "lucide-react";
import { Button } from "@/ui/button";
import StatCard from "@/ui/StateCard";
import CategoriesTable from "@/features/categories/CategoriesTable";
import { Modal } from "@/ui/Modal";
import { CategoryForm } from "@/features/categories/CategoryForm";

export default function ManageCategories() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:col-span-3">
        <StatCard
          title="Total Categories"
          value="6"
          description="technology tracks"
          icon={<LayoutGrid className="h-5 w-5" />}
          iconBgColor="bg-blue-100 dark:bg-blue-900/30"
          iconTextColor="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          title="Visible"
          value="3"
          description="shown on public site"
          icon={<Eye className="h-5 w-5" />}
          iconBgColor="bg-emerald-100 dark:bg-emerald-900/30"
          iconTextColor="text-emerald-600 dark:text-emerald-400"
        />
        <StatCard
          title="Hidden"
          value="3"
          description="not yet published"
          icon={<EyeOff className="h-5 w-5" />}
          iconBgColor="bg-rose-100 dark:bg-rose-900/30"
          iconTextColor="text-rose-600 dark:text-rose-400"
        />
      </div>

      <div className="flex flex-col gap-4 ">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            All Categories
          </h2>
          <Modal>
            <Modal.Open opens="create-category">
              <Button className="w-full bg-yellow-500 text-slate-900 hover:bg-yellow-600 lg:w-auto px-6 py-6 font-bold">
                <Plus className="mr-2 h-5 w-5" />
                Add Category
              </Button>
            </Modal.Open>
            <Modal.Window
              name="create-category"
              title="Create Category"
              description="Add new category in the website"
              className="w-2xl"
            >
              <CategoryForm />
            </Modal.Window>
          </Modal>
        </div>
        <CategoriesTable />
      </div>
    </div>
  );
}
