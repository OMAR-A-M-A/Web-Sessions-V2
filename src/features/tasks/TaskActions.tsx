import { Button } from "@/ui/button";
import { Modal } from "@/ui/Modal";
import { Eye, X } from "lucide-react";
import TaskSolutionsModal from "./TaskSolutionsModal";
import { ConfirmDelete } from "@/ui/ConfirmDelete";
import { useDeleteTask } from "./hooks/useDeleteTask";
interface TaskActionsProp {
  id: string;
  title: string;
}

function TaskActions({ title, id }: TaskActionsProp) {
  const { deleteTask, isDeleting } = useDeleteTask();
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-500 hover:text-green-600 dark:text-slate-400 dark:hover:text-green-400"
          to={`${id}`}
        >
          <Eye className="h-4 w-4" />
        </Button>

        {/* Top Solutions Button & Modal */}
        <Modal>
          <Modal.Open opens="top-solutions">
            <Button
              variant="outline"
              className="h-7 px-3 text-xs font-medium border-slate-700/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
            >
              Top Solutions
            </Button>
          </Modal.Open>
          <Modal.Window
            name="top-solutions"
            title={`Top Solutions`}
            className="max-w-2xl bg-[#0d1117] border-slate-800"
          >
            <TaskSolutionsModal taskId={id} />
          </Modal.Window>
        </Modal>

        {/* Delete Button */}
        <Modal>
          <Modal.Open opens="delete-task">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-slate-500 hover:text-red-400 hover:bg-slate-800/80 transition-colors opacity-0 group-hover:opacity-100"
              title="Delete Task"
            >
              <X className="w-4 h-4" />
            </Button>
          </Modal.Open>
          <Modal.Window
            name="delete-task"
            title="Delete Task"
            description={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
            className="max-w-lg"
          >
            <ConfirmDelete
              resourceName="task"
              disabled={isDeleting}
              onConfirm={() => deleteTask(id)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default TaskActions;
