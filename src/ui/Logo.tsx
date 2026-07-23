import { useDarkMode } from "@/context/DarkModeContext";

export function Logo() {
  const { isDark } = useDarkMode();
  const logoImg: string = isDark
    ? "/dark-mode-logo.png"
    : "/light-mode-logo.png";
  return (
    <div className="flex items-center gap-3 px-1 py-4 border-b border-slate-200 dark:border-slate-700 justify-center transition-colors duration-300">
      <div className="w-46">
        <img src={logoImg} alt="Website Logo" className="object-contain" />
      </div>
    </div>
  );
}
