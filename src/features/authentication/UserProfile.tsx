import { useUser } from "./hooks/useUser";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

export function UserProfile() {
  const { user } = useUser();
  const { email } = user || {};
  const { full_name: fullName, avatar_url: avatar } = user?.user_metadata || {};


  return (
    <div className="flex items-center gap-3 pb-2 pt-4 px-3 transition-colors border-t-2 border-slate-200 dark:border-slate-800">
      <div className="shrink-0">
        <img
          src={avatar || "/default-user.jpg"}
          alt={`Avatar of ${fullName || email}`}
          className="h-10 w-10 rounded-full object-cover outline-2 outline-slate-200 dark:outline-slate-700"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-700 dark:text-slate-100 truncate">
          {email}
        </p>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
          Administrator
        </p>
      </div>

      <Link
        to="account"
        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
        title="Account Settings"
      >
        <Settings size={18} />
      </Link>
    </div>
  );
}
