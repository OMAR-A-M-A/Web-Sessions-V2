import type { TaskListItem } from "@/types/TaskTypes";
import clsx from "clsx";
import TaskActions from "./TaskActions";

interface TaskItemProps {
  task: TaskListItem;
}

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 border-slate-200 hover:border-slate-300 dark:bg-slate-900/40 border dark:border-slate-800/60 rounded-xl mb-2 dark:hover:border-slate-700 transition-colors group">
      {/* Left side: Tag and Titles */}
      <div className="flex items-center gap-5">
        {/* Task Type Badge */}
        <span
          className={clsx(
            `flex items-center justify-center px-3 py-1 rounded-md border text-[11px] font-semibold capitalize tracking-wider`,
            {
              "border-blue-500/30 text-blue-600 bg-blue-50 dark:border-blue-500/40 dark:text-blue-400 dark:bg-blue-500/10":
                task.task_type === "coding",
              "border-amber-500/30 text-amber-600 bg-amber-50 dark:border-amber-500/40 dark:text-amber-400 dark:bg-amber-500/10":
                task.task_type === "research",
            },
          )}
        >
          {task.task_type}
        </span>

        {/* Title and Subtitle */}
        <div className="flex flex-col gap-0.5">
          <h3 className="text-slate-800 dark:text-slate-200 font-medium text-sm">{task.title}</h3>
          <p className="text-slate-500 dark:text-slate-400 text-[13px]">
            {task.sessionTitle || task.summary || "No description provided"}
          </p>
        </div>
      </div>

      {/* Right side: Actions */}
      <TaskActions id={task.id} title={task.title} />
    </div>
  );
}
