"use client";

import { MovieLogo } from "@/components/MovieLogo";
import Phone from "@/components/Phone";
import Email from "@/components/Email";

export default function Home() {
  return (
    <div className="max-w-[1200px] w-full w-[100%]">
      {typeof window !== "undefined" && window.innerWidth >= 375 && window.innerWidth <= 700 ? (
        <div className="w-[100%] h-[300px] bg-[#4338CA]  text-white mt-[30px] py-[10%]">
          <div className="flex flex-col items-start ml-[10px]">
            <div className="flex items-center justify-items-center text-sx mt-2 mx-4">
              <MovieLogo width={30} height={30} className="text-white" />
              <p className="mb-[5px] text-lx font-semibold self-center italic text-white dark:text-white">
                Movie Z
              </p>
            </div>
            <p className="text-xs ml-[10px]">
              © 2024 Movie Z. All Rights Reserved.
            </p>
          </div>

          <div className="flex w-full gap-[70px] text-white mt-4 ml-6">
            <div className="flex flex-col gap-[10px]">
              <strong>Contact information</strong>
              <div className="flex items-center space-x-4">
                <Email />
                <div className="flex flex-col">
                  <p className="font-semibold ">Email</p>
                  <p className="text-sm">support@movieZ.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Phone />
                <div>
                  <p>Phone</p>
                  <p>+976 (11) 123-4567</p>
                </div>
              </div>
            </div>

            <div className=" flex flex-col gap-1">
              <h1>Follow us:</h1>
              <a>Facebook</a>
              <a>Instagram</a>
              <a>Twitter</a>
              <a>Youtube</a>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[100%] h-[280px] bg-[#4338CA] flex relative text-white mt-[25px]">
          <div className="pt-[40px] px-[20px]">
            <div className="flex items-center ">
              <MovieLogo width={30} height={30} className="text-white" />
              <p className="mb-[5px] text-xl font-semibold self-center italic text-white dark:text-white">
                Movie Z
              </p>
            </div>
            <p className="absolute left-[20px]">
              © 2024 Movie Z. All Rights Reserved.
            </p>
          </div>

          <div className="absolute left-[44%] top-[10%] flex flex-col gap-[30px] md:mt-5">
            <p>Contact information</p>
            <div className="flex items-center space-x-4">
              <Email />
              <div className="flex flex-col">
                <p className="font-semibold ">Email</p>
                <p className="text-sm">support@movieZ.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Phone />
              <div>
                <p>Phone</p>
                <p>+976 (11) 123-4567</p>
              </div>
            </div>
          </div>

          <div className="absolute left-[65%] top-[10%] flex flex-col lg:ml-[10px] gap-[30px] md:ml-[100px] mt-5">
            <h1>Follow us:</h1>
            <div className="lg:flex gap-[5%] md: grid grid-col-2">
              <a>Facebook</a>
              <a>Instagram</a>
              <a>Twitter</a>
              <a>Youtube</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
