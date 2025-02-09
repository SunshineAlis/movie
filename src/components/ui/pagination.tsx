import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";


type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  const handlePrevious = () => onPageChange(Math.max(1, page - 1));
  const handleNext = () => onPageChange(Math.min(totalPages, page + 1));

  const getPaginationPages = () => {
    const pages: number[] = [];
   
    for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <PaginationButton onClick={handlePrevious} disabled={page <= 1}>
        <div className="flex items-center">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </div>
      </PaginationButton>

      {getPaginationPages().map((pageNumber) => (
        <PaginationButton
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          isActive={pageNumber === page}
        >
          {pageNumber}
        </PaginationButton>
      ))}

      {totalPages > 5 && page < totalPages - 2 && (
        <span className="px-2">
          <MoreHorizontal className="h-4 w-4" />
        </span>
      )}

      <PaginationButton onClick={handleNext} disabled={page >= totalPages}>
        <div className="flex items-center">
          Next
          <ChevronRight className="h-4 w-4" />
        </div>
      </PaginationButton>
    </div>
  );
};

type PaginationButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
};

const PaginationButton = ({
  onClick,
  children,
  isActive,
  disabled,
}: PaginationButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "px-4 py-2 rounded-md text-sm font-medium border transition-all",
      isActive
        ? "bg-blue-500 text-white"
        : "bg-white text-black hover:bg-gray-200",
      disabled && "opacity-50 cursor-not-allowed"
    )}
  >
    {children}
  </button>
);

export default Pagination;
