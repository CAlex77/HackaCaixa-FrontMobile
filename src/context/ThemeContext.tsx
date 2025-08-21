import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

export type AppTheme = "light" | "dark";

type ThemeCtx = { theme: AppTheme; toggleTheme: () => void };
const ThemeContext = createContext<ThemeCtx>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<AppTheme>("light");
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useThemeCtx = () => useContext(ThemeContext);
