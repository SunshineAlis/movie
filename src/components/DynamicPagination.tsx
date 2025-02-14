import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


type PaginationProps = {
  page: number;
  totalPages: number;
  // currentPage:number
  onPageChange: (newPage: number) => void;
};
export const DynamicPagination = ({ total_page }: { total_page: number }) =>  {
  const totalPage = total_page > 100 ? 100 : total_page;

  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    const param = new URLSearchParams(searchParams);
    param.set("page", String(page));
    push(`${pathname}?${param.toString()}`);
  };
  const handleNext = () => {
    if (currentPage < totalPage) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  return (
    <Pagination className="my-4">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevious} />
          </PaginationItem>
        )}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            isActive
            onClick={() => handlePageChange(currentPage)}
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {totalPage - 1 > currentPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {totalPage > currentPage && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(totalPage)}>
              {totalPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {totalPage > currentPage && (
          <>
            {/* <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}
            <PaginationItem>
              <PaginationNext onClick={handleNext} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
};

//   return (
//     <div className="flex items-center justify-center gap-2 mt-6">
//       <PaginationButton onClick={handlePrevious} disabled={page <= 1}>
//         <div className="flex items-center">
//           <ChevronLeft className="h-4 w-4" />
//           Previous
//         </div>
//       </PaginationButton>

//       {getPaginationPages().map((pageNumber) => (
//         <PaginationButton
//           key={pageNumber}
//           onClick={() => onPageChange(pageNumber)}
//           isActive={pageNumber === page}
//         >
//           {pageNumber}
//         </PaginationButton>
//       ))}

//       {totalPages > 5 && page < totalPages - 2 && (
//         <span className="px-2">
//           <MoreHorizontal className="h-4 w-4" />
//         </span>
//       )}

//       <PaginationButton onClick={handleNext} disabled={page >= totalPages}>
//         <div className="flex items-center">
//           Next
//           <ChevronRight className="h-4 w-4" />
//         </div>
//       </PaginationButton>
//     </div>
//   );
// };

// type PaginationButtonProps = {
//   onClick: () => void;
//   children: React.ReactNode;
//   isActive?: boolean;
//   disabled?: boolean;
// };

// const PaginationButton = ({
//   onClick,
//   children,
//   isActive,
//   disabled,
// }: PaginationButtonProps) => (
//   <button
//     onClick={onClick}
//     disabled={disabled}
//     className={cn(
//       "px-4 py-2 rounded-md text-sm font-medium border transition-all",
//       isActive
//         ? "bg-blue-500 text-white"
//         : "bg-white text-black hover:bg-gray-200",
//       disabled && "opacity-50 cursor-not-allowed"
//     )}
//   >
//     {children}
//   </button>
// );

// export default Pagination;
