"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@rt/components/ui/navigation-menu";
import SignOutButton from "@rt/components/Buttons/SignOutButton";
import { Button } from "@rt/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = theme === "dark";
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg transition-colors">
      <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
        App
      </div>

      <div className="flex items-center space-x-6">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            <NavigationMenuItem>
              <NavigationMenuLink className=" cursor-pointer" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className=" cursor-pointer" asChild>
                <Link href="/products">Products</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <SignOutButton text="Sign Out" />

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {/* Bu kısım sadece client mount olduktan sonra render edilir */}
          {mounted && (
            <>
              {isDarkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </>
          )}
        </Button>
      </div>
    </header>
  );
}
