import { useState, useEffect } from "react";
import { Moon, Sun, PlusCircle } from "lucide-react";

interface ThemeToggleProps {
  onNewChat?: () => void;
}

const ThemeToggle = ({ onNewChat }: ThemeToggleProps) => {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark" || 
    (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    const html = document.documentElement;
    
    if (isDark) {
      html.classList.add("dark");
      html.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.add("light");
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="flex items-center gap-1">
      {onNewChat && (
        <button
          onClick={onNewChat}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 ease-in-out"
          aria-label="New chat"
        >
          <PlusCircle className="h-5 w-5 text-primary" />
        </button>
      )}
      
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 ease-in-out"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="h-5 w-5 text-gray-200" />
        ) : (
          <Moon className="h-5 w-5 text-gray-700" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;