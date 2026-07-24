import { SiGithub, SiGmail } from "react-icons/si";
import { Button } from "@/ui/button";
import { useLogin } from "@/features/authentication/hooks/useLogin";

function LoginOAuthButtons() {
  const { isOAuthPending, loginOAuth } = useLogin();
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-500 dark:bg-slate-900 dark:text-slate-400 transition-colors">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          type="button"
          disabled={isOAuthPending}
          onClick={() => loginOAuth("github")}
        >
          <SiGithub className="mr-2 h-5 w-5 text-black" />
          GitHub
        </Button>

        <Button
          variant="outline"
          type="button"
          disabled={isOAuthPending}
          onClick={() => loginOAuth("google")}
        >
          <SiGmail className="mr-2 h-5 w-5 text-red-800" />
          Google
        </Button>
      </div>
    </>
  );
}

export default LoginOAuthButtons;
