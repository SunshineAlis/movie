"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { MovieLogo } from "@/components/MovieLogo";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"; // @radix-ui-ийн бүх элементүүдийг нэг импортлоно

import { FaSearch } from "react-icons/fa";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Header() {
  const { setTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center justify-items-center ">
          <MovieLogo width={30} height={30} className="text-[#4338CA]" />
          <p className="mb-[5px] text-xl font-semibold self-center italic text-[#4338CA] dark:text-white">
            Movie Z
          </p>
        </div>

        {/* Genre select section */}
        <div className="flex gap-5">
          <div className="flex items-center gap-4">
            {/* Select tag with genres */}
            <Select>
              <SelectTrigger className="w-[100px] flex-row-reverse">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="action">Action</SelectItem>
                <SelectItem value="comedy">Comedy</SelectItem>
                <SelectItem value="drama">Drama</SelectItem>
                <SelectItem value="horror">Horror</SelectItem>
                <SelectItem value="romance">Romance</SelectItem>
              </SelectContent>
            </Select>

            {/* Search Input with Search Icon */}
            <div className="relative">
              <Input
                placeholder="Search..."
                className="pl-10 text-gray-900 dark:text-white"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
        </div>

        {/* Theme Toggle Button */}
        <div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
              <DropdownMenu.Item onClick={() => setTheme("system")}>
                System
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  );
}
