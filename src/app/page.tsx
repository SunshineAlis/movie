import Image from "next/image";
import { Input } from "@/components/ui/input";
import { MovieLogo } from "@/components/Movielogo";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <MovieLogo width={30} height={30} />
          <p className="ml-2">Movie Z</p>
        </div>

        {/* Input хэсэг */}
        <div className="flex gap-5">
          <Input placeholder="Search..." />
          <Input placeholder="Search..." />
        </div>

        {/* Other text */}
        <p>odor shono</p>
      </div>
    </div>
  );
}
