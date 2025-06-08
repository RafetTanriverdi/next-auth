"use client";
import SignOutButton from "@rt/components/Buttons/SignOutButton";
import { Button } from "@rt/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Header() {
  const { setTheme, theme } = useTheme();

  const isDarkMode = theme === "dark";
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg transition-colors">
      <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
        App
      </div>
      <div className="flex items-center space-x-4">
        <SignOutButton text="Sign Out" />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <Sun className="h-10 w-10 " />
          ) : (
            <Moon className="h-10 w-10 " />
          )}
        </Button>
      </div>
    </header>
  );
}
