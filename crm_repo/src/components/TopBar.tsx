import { ThemeToggle } from "@/components/theme-toggle";
import { Sparkles } from "lucide-react";

export function TopBar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-50">
      
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
          Lead CRM
        </h1>
      </div>

      <ThemeToggle />
    </div>
  );
}