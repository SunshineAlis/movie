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
} from "@/components/ui/pagination";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

export const DynamicPagination = ({ total_page }: { total_page: number }) => {
  const totalPage = total_page > 100 ? 100 : total_page;

  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams?.get("page")) || 1;

  const handlePageChange = (page: number) => {
    const param = new URLSearchParams(searchParams?.toString());
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
        {/* Previous Page Button */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevious} />
          </PaginationItem>
        )}

        {/* Show previous page only if it's not too far behind */}
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Current Page */}
        <PaginationItem>
          <PaginationLink
            isActive
            onClick={() => handlePageChange(currentPage)}
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {/* Show ellipsis if more pages are available */}
        {totalPage > currentPage + 1 && currentPage + 2 < totalPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last Page */}
        {totalPage > currentPage && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(totalPage)}>
              {totalPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next Page Button */}
        {currentPage < totalPage && (
          <PaginationItem>
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
