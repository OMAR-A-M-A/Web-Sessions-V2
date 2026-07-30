import { useTask } from "./hooks/useTask";
import TaskSolutionCard from "./TaskSolutionCard";
import { Spinner } from "@/ui/Spinner";
import { Button } from "@/ui/button";

export default function TaskSolutionsModal({ taskId }: { taskId: string }) {
  const { task, isLoadingTask } = useTask(taskId);

  if (isLoadingTask)
    return (
      <div className="flex p-8 justify-center w-lg">
        <Spinner containerClassName="min-h-[20vh]" />
      </div>
    );

  return (
    <div className="flex flex-col gap-4 w-lg">
      <p className="text-slate-600 dark:text-slate-400 text-[13px] mb-2 -mt-2">
        Rankings are specific to this task only — not a global leaderboard.
      </p>

      <div className="flex flex-col max-h-[50vh] overflow-y-auto pr-2">
        {task?.task_solutions
          ?.sort((a, b) => a.rank - b.rank)
          .map((solution) => (
            <TaskSolutionCard key={solution.id} solution={solution} />
          ))}
        {(!task?.task_solutions || task.task_solutions.length === 0) && (
          <p className="text-slate-500 text-sm py-4">No solutions yet.</p>
        )}
      </div>

      <Button
        variant="outline"
        className="w-max mt-2 border-slate-300 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 text-slate-700 dark:text-slate-400 h-8 text-xs px-3 font-medium transition-colors"
      >
        + Add Solution
      </Button>
    </div>
  );
}
