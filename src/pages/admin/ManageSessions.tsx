import { SessionForm } from "@/features/sessions/SessionForm";
import SessionsOperations from "@/features/sessions/SessionsOperations";
import SessionsTable from "@/features/sessions/SessionsTable";
import AddButton from "@/ui/AddButton";
import { useSessions } from "@/features/sessions/hooks/useSessions";

export default function ManageSessions() {
  const { sessions, isLoadingSessions, count } = useSessions();
  return (
    <div className="flex flex-col gap-8 ">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          All Sessions
        </h2>
        <div className="flex gap-5 items-center">
          <SessionsOperations />
          <AddButton buttonName="Add Session">
            <SessionForm count={count} />
          </AddButton>
        </div>
      </div>
      <SessionsTable
        count={count}
        sessions={sessions}
        isLoadingSessions={isLoadingSessions}
      />
    </div>
  );
}
