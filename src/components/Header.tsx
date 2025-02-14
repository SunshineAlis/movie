"use client";
import { MovieLogo } from "@/components/MovieLogo";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Genre from "@/components/Genre";
import { useRouter } from "next/navigation";
import Search from "@/components/Search";
import SearchOld from "@/components/SearchOld";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  return (
    <div>
      {window.innerWidth >= 375 && window.innerWidth <= 750 ? (
        <Search />
      ) : (
        <div className="max-w-[1200px] w-[100%] bg-white m-auto flex items-center justify-between gap-2 py-2 pt-4 dark:bg-gray-900">
          <div
            className="flex items-center mx-2 px-2 w-[200px] cursor-pointer"
            onClick={() => router.push("/")}
          >
            <MovieLogo width={30} height={30} className="text-[#4338CA]" />
            <p className="text-[8px] w-20 lg:mb-[5px] text-xl font-semibold italic text-[#4338CA] dark:text-white">
              Movie Z
            </p>
          </div>

          <div className="flex items-center gap-[10%] ">
            <Genre />
            <SearchOld />
          </div>
          <div className="px-2">
            <Button
              variant="outline"
              size="icon"
              className="flex z-10"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
