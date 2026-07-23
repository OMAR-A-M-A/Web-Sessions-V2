import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function AppLayout() {
  return (
    <div className="grid h-screen w-full grid-cols-[256px_1fr] bg-slate-50 font-sans text-slate-900 dark:bg-[#0B1120] dark:text-slate-50 transition-colors duration-300">
      <Sidebar />
      <div className="flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}