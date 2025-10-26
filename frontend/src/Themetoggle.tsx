import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

interface ThemeToggleProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}
