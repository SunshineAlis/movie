import { MovieLogo } from "@/components/MovieLogo";
import Phone from "@/components/Phone";
import Email from "@/components/Email";

export default function Home() {
  return (
    <div className="w-[100%] h-[280px] bg-[#4338CA] flex relative text-white mt-[30px]">
      <div className="flex flex-col content-center absolute left-[5%] top-[15%]">
        <div className="flex items-center justify-items-center ">
          <MovieLogo width={30} height={30} className="text-white" />
          <p className="mb-[5px] text-xl font-semibold self-center italic text-white dark:text-white">
            Movie Z
          </p>
        </div>
        <p>© 2024 Movie Z. All Rights Reserved.</p>
      </div>

      <div className="absolute left-[55%] top-[10%] flex flex-col gap-[30px]">
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

      <div className="absolute left-[73%] top-[10%] flex flex-col gap-[30px]">
        <h1>Follow us</h1>
        <div className="flex gap-[5%]">
          <a>Facebook</a>
          <a>Instagram</a>
          <a>Twitter</a>
          <a>Youtube</a>
        </div>
      </div>
    </div>
  );
}
