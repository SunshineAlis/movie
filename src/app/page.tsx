import Header from "@/components/Header"; // Header-ийг импортлоно
import Footer from "@/components/Footer";

import { MovieLogo } from "@/components/MovieLogo";
import Phone from "@/components/Phone";
import Email from "@/components/Email";

export default function Home() {
  return (
    <div>
      {/* Header component */}
      <Header />

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
}
