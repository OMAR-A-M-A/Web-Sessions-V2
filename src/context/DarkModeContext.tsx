import { createContext, useContext, useEffect, type ReactNode } from "react";

import { useLocalStorageState } from "@/hooks/useLocalStorageState";

type DarkModeContextType = {
  isDark: boolean;
  handleToggleDarkMode: () => void;
};

const DarkMode = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [isDark, setIsDark] = useLocalStorageState<boolean>(
    prefersDark,
    "isDarkMode",
  );

  function handleToggleDarkMode() {
    setIsDark((dark) => !dark);
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <DarkMode.Provider
      value={{
        isDark,
        handleToggleDarkMode,
      }}
    >
      {children}
    </DarkMode.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDarkMode() {
  const context = useContext(DarkMode);

  if (!context) {
    throw new Error("useDarkMode must be used within DarkModeProvider");
  }

  return context;
}
