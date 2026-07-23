import { Link } from "react-router-dom";
import { ChevronRight, Sun, Moon } from "lucide-react";

import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { useDarkMode } from "@/context/DarkModeContext";

export function Header() {
  const breadcrumbs = useBreadcrumbs();
  const { isDark, handleToggleDarkMode } = useDarkMode();

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={crumb.to} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="mx-2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                )}

                {isLast ? (
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.to}
                    className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="flex items-center gap-4">
        <button
          onClick={handleToggleDarkMode}
          aria-label="Toggle theme"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
}
