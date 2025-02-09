"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieSlide from "@/components/MovieSlide";
import MovieComponent from "@/components/MovieComponent";


const Home = () => {


  return (
    <div>
      <Header />
      <MovieSlide />
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
