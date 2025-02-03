import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { useTheme } from "next-themes";
  import { Button } from "@/components/ui/button";
  import { useRouter } from "next/navigation";
  
  export function Genre() {
    const { setTheme } = useTheme();
    const router = useRouter();  // Define the router here
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <a>Genre</a>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => router.push("./category")}>
            Action
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  