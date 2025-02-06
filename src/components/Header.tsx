"use client";
import { MovieLogo } from "@/components/MovieLogo";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Search from "@/components/Search";
import Genre from "@/components/Genre";



export default function Header() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="bg-white  flex items-center gap-[10%] p-4 dark:bg-gray-900">

        {/* movieLogo */}
        <div className="flex items-center ml-[5%] w-[20%]">
          <MovieLogo width={30} height={30} className="text-[#4338CA]" />
          <p className="mb-[5px] text-xl font-semibold italic text-[#4338CA] dark:text-white">
            Movie Z
          </p>
        </div>
        <div className="flex items-center gap-[30%] ml-[7%]">
        <Genre />
        <Search />
        </div>
        {/* narsarta */}
        <div className="ml-[12%]">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              <DropdownMenu.Item onClick={() => setTheme("light")}>Light</DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => setTheme("dark")}>Dark</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
    </div>
  );
}
