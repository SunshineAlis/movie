"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { Movie } from "@/types";
import { getSearchMovies } from "@/utils/requests";



export default function Search() {

    const router = useRouter;
    const [searchQuery,setSearchQuery] = useState<string>("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const pageQuery = searchParams?.get("page");
    const page = pageQuery ? Number(pageQuery) : 1;
    useEffect(()=>{
    const timer= setTimeout(() => {
        if(searchQuery.trim()){
            searchMovies(searchQuery);
        } else { 
            setMovies([]);

        }
    }, 300);
return ()=>clearTimeout(timer);
},[searchQuery]);
const handlePageChange = (newPage: number) => {
    router.push(`/category?genres=${selectedGenres.join(",")}&page=${newPage}`);
  };

const searchMovies =async (query: string )=>{
    try{
        const data =await getSearchMovies(query);
        setMovies (data.results || []);
    } catch(error){
        console.error("error" ,error);
    }

};
return(
            <div className="relative w-[400px]">
      {/* Search input */}
      <div className="border rounded-lg relative">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="pl-10 text-gray-900 dark:text-white"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
      </div>
    </div>

    {searchQuery && (
        
    )}
)

}
