"use client";
import { MovieLogo } from "@/components/MovieLogo";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { SearchInput } from "@/components/SearchInput";
import Genre from "@/components/Genre";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Search from "@/components/Search";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [isActiveSearch, setIsActiveSearch] = useState(false);

  return (
    <div>
      {window.innerWidth >= 375 && window.innerWidth <= 950 ? (
        <div className="bg-white  flex items-center gap-[5%] p-4 dark:bg-gray-900">
          {/* movieLogo */}
          <div
            className="flex items-center ml-[3%] w-[200px] cursor-pointer"
            onClick={() => router.push("/")}
          >
            <MovieLogo width={30} height={30} className="text-[#4338CA]" />
            <p className="text-[8px] lg:mb-[5px] text-xl font-semibold italic text-[#4338CA] dark:text-white">
              Movie Z
            </p>
          </div>
          <div className="flex items-center gap-[10px] ml-[50%] ">
            <SearchInput
              setIsActiveSearch={setIsActiveSearch}
              isActiveSearch={isActiveSearch}
            />
            <Search />

            {/* narsarta */}
            <div className="">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setTheme(theme === "light" ? "dark" : "light")
                    }
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
                  <DropdownMenu.Item onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white  flex items-center gap-[5%] p-4 dark:bg-gray-900">
          {/* movieLogo */}
          <div
            className="flex items-center ml-[3%] w-[200px] cursor-pointer"
            onClick={() => router.push("/")}
          >
            <MovieLogo width={30} height={30} className="text-[#4338CA]" />
            <p className="text-[8px] lg:mb-[5px] text-xl font-semibold italic text-[#4338CA] dark:text-white">
              Movie Z
            </p>
          </div>
          <div className="flex items-center gap-[30%] ml-[7%]">
            <Genre />
            <SearchInput
              setIsActiveSearch={setIsActiveSearch}
              isActiveSearch={isActiveSearch}
            />
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
                <DropdownMenu.Item onClick={() => setTheme("light")}>
                  Light
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>
      )}
    </div>
  );
}
