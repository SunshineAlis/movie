"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { MovieLogo } from "@/components/MovieLogo";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaSearch } from "react-icons/fa";
import { getGenres } from "../utils/requests";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Genre {
  id: number;
  name: string;
}

export default function Header() {
  const { setTheme } = useTheme();
  const router = useRouter();

  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // Ensure genres are fetched on the client-side
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Жанрууд татахад алдаа гарлаа:", error);
      }
    };

    fetchGenres();
  }, []);

  // Handle genre selection
  const handleGenreSelect = (genreId: string) => {
    setSelectedGenre(genreId);
    router.push(`/category/${genreId}`); // Redirect to category page with genreId
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <MovieLogo width={30} height={30} className="text-[#4338CA]" />
          <p className="mb-[5px] text-xl font-semibold italic text-[#4338CA] dark:text-white">
            Movie Z
          </p>
        </div>

        <div className="flex gap-5">
          <div className="flex items-center gap-4">
            <Select onValueChange={handleGenreSelect}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre.id} value={genre.id.toString()}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative">
              <Input
                placeholder="Search..."
                className="pl-10 text-gray-900 dark:text-white"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all dark:rotate-0 dark:scale-100" />
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
  );
}
