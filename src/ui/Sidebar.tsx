import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MonitorPlay,
  ListTodo,
  Briefcase,
  MessageSquare,
  Settings,
  ChartBarStacked,
} from "lucide-react";
import { Logo } from "./Logo";

const navLinks = [
  { name: "Overview", to: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Sessions", to: "/admin/sessions", icon: MonitorPlay },
  { name: "Tasks", to: "/admin/tasks", icon: ListTodo },
  { name: "Categories", to: "/admin/categories", icon: ChartBarStacked },
  { name: "Feedback", to: "/admin/feedbacks", icon: MessageSquare },
  { name: "Portfolio", to: "/admin/portfolio", icon: Briefcase },
  { name: "Settings", to: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 dark:border-slate-800  bg-white transition-colors duration-300 dark:bg-[#0f172a]">
      <Logo />

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.to}
            end={link.to === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
              }`
            }
          >
            <link.icon className="h-5 w-5" />
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
