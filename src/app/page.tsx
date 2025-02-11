"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieSlide from "@/components/MovieSlide";
import MovieComponent from "@/components/MovieComponent";
import { MovieCardSmall } from "@/components/MovieCardSmall";
import { useState, useEffect } from "react";

const Home = () => {
  const [isSmartCard, setIsSmartCard] = useState(
    typeof window !== "undefined" && window.innerWidth >= 375 && window.innerWidth <= 950
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmartCard(window.innerWidth >= 375 && window.innerWidth <= 950);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Header />

      {/* Зөвхөн нэгийг нь харуулах */}
      {isSmartCard ? <MovieCardSmall /> : <MovieSlide />}

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
