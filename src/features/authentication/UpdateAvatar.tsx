import { useRef, type ChangeEvent } from "react";
import { useUser } from "./hooks/useUser";
import { useUpdateUser } from "./hooks/useUpdatedUser";
import { Camera } from "lucide-react";

export function UpdateAvatar() {
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { full_name: fullName, avatar_url: avatar } = user?.user_metadata || {};

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    updateUser({ avatar: file });
  }

  return (
    <div className="flex flex-col items-center justify-center mb-8 relative group">
      <div className="relative">
        <img
          src={avatar || "/default-user.jpg"}
          alt={`Avatar of ${fullName || 'User'}`}
          className="h-80 w-80 rounded-full object-cover border-4 border-slate-200 dark:border-slate-700 shadow-md transition-all duration-300"
        />
        <button
          disabled={isUpdating}
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-6 right-6 p-2.5 bg-yellow-500 rounded-full text-slate-900 hover:bg-yellow-600 transition-colors shadow-lg disabled:opacity-50 cursor-pointer"
          title="Update Avatar"
        >
          <Camera size={20} />
        </button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
