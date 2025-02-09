"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import {
    getPopularMovies,
    getTopRatedMovies,
    getUpComingMovies,
} from "@/utils/requests";
import Link from "next/link";
import { Movie } from "@/types";

const MovieComponent = ({
    selectedCategory,
}: { selectedCategory?: string; }) => {

    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [upComingMovies, setUpComingMovies] = useState<Movie[]>([]);
    const router = useRouter();
    useEffect (()=>{
    let isMounted =true;
    const getData = async ()=>{
        try {
            const [popular,topRated,upComing]= await Promise.all([
                getPopularMovies(),
                getTopRatedMovies(),
                getUpComingMovies(),
            ]);
            if(isMounted){
                setPopularMovies(popular.results.slice(0,10));
                setTopRatedMovies(topRated.results.slice(0,10));
                setUpComingMovies(upComing.results.slice(0,10))
            }
            
        } catch (error){
            console.error(" Aлдаа гарлаа:", error);
        }
    }
}
)
}