import type { TaskSolution } from "@/types/TaskTypes";
import { X } from "lucide-react";
import { Button } from "@/ui/button";

interface TaskSolutionCardProps {
  solution: TaskSolution;
}

export default function TaskSolutionCard({ solution }: TaskSolutionCardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-xl mb-3 group">
      <div className="flex items-start gap-4">
        {/* Rank Circle */}
        <div className={`flex shrink-0 items-center justify-center w-6 h-6 rounded-full border text-xs font-semibold ${
          solution.rank === 1 ? 'border-yellow-500/50 text-yellow-500' : 
          solution.rank === 2 ? 'border-slate-400/50 text-slate-400' : 
          'border-amber-700/50 text-amber-600'
        }`}>
          {solution.rank}
        </div>
        
        {/* Info */}
        <div className="flex flex-col">
          <span className="text-slate-200 text-sm font-medium">{solution.student_name}</span>
          <a href={solution.solution_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline text-xs my-0.5 break-all">
            {solution.solution_url}
          </a>
          {solution.notes && (
            <span className="text-slate-400 text-xs mt-1">
              {solution.notes}
            </span>
          )}
        </div>
      </div>
      
      {/* Delete button (mocked) */}
      <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
