import { UpdateAvatar } from "@/features/authentication/UpdateAvatar";
import { UpdateUserDataForm } from "@/features/authentication/UpdateUserDataForm";
import { UpdatePasswordForm } from "@/features/authentication/UpdatePasswordForm";

export default function Account() {
  return (
    <div className="w-full max-w-7xl flex flex-col gap-4 mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">
        Update your account
      </h1>
      
      <div className="w-full mb-1">
        <UpdateAvatar />
      </div>
      
      <div className="w-full">
        <UpdateUserDataForm />
      </div>
      
      <div className="w-full">
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
