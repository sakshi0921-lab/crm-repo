"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) {
    return (
      <Button
        size="icon"
        variant="ghost"
        className="rounded-xl w-10 h-10"
        disabled
      />
    );
  }

  return (
    <Button
      onClick={toggleTheme}
      size="icon"
      variant="ghost"
      className="group relative rounded-xl w-10 h-10 border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 overflow-hidden"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:from-blue-400/20 dark:to-purple-400/20" />
      
      {isDark ? (
        <Moon className="h-4 w-4 text-blue-500 relative z-10 transition-all duration-300" />
      ) : (
        <Sun className="h-4 w-4 text-yellow-500 relative z-10 transition-all duration-300" />
      )}
    </Button>
  );
}
