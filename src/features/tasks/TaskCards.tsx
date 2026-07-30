import { Spinner } from "@/ui/Spinner";
import { useTasks } from "./hooks/useTasks";
import TaskItem from "./TaskItem";
import TechIcon from "@/ui/TechIcon";
import type { TaskListItem } from "@/types/TaskTypes";

function TaskCards() {
  const { isLoadingTasks, tasks } = useTasks();
  if (isLoadingTasks) return <Spinner />;

  // Group tasks by category
  const groupedTasks = tasks?.reduce(
    (acc, task) => {
      const catName = task.categories?.name || "Uncategorized";
      if (!acc[catName]) {
        acc[catName] = {
          category: task.categories,
          tasks: [],
        };
      }
      acc[catName].tasks.push(task);
      return acc;
    },
    {} as Record<
      string,
      { category: TaskListItem["categories"]; tasks: TaskListItem[] }
    >,
  );

  return (
    <div className="flex flex-col gap-4 w-full py-6">
      {groupedTasks &&
        Object.entries(groupedTasks).map(([catName, group]) => (
          <div key={catName} className="flex flex-col gap-3">
            <div className="flex items-center gap-3 px-2">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-800 border border-slate-700/50"
                style={{ color: group.category?.categoryColor || "#94a3b8" }}
              >
                <TechIcon
                  techName={group.category?.slug || "default"}
                  className="w-4 h-4"
                />
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-slate-200 font-semibold text-[15px]">
                  {catName}
                </h2>
                <span className="text-slate-500 text-xs font-medium">
                  {group.tasks.length} task{group.tasks.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              {group.tasks.map((task) => (
                <TaskItem task={task} key={task.id} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default TaskCards;
