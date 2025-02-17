"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieSlide from "@/components/MovieSlide";
import MovieComponent from "@/components/MovieComponent";
import { MovieCardSmall } from "@/components/MovieCardSmall";
import { useState, useEffect } from "react";

const Home = () => {
  return (
    <div className="max-w-[1200px] w-[100%] m-auto">
      <Header />

      {typeof window !== "undefined" && window.innerWidth >= 375 && window.innerWidth <= 950 ? (
        <MovieCardSmall />
      ) : (
        <MovieSlide />
      )}

      <MovieComponent />
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Welcome to Movie Z!
        </h1>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Explore movies, shows, and more.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
