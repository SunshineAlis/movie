"use client";
import { useEffect, useState } from "react";

export const Pagination = ({
  fetchData,
  totalPages,
}: {
  fetchData: () => void;
  totalPages: number;
}) => {
  const [page, setPage] = useState<number>(1); //

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPage(page);
      fetchData(); //
    }
  };

  const getPaginationPages = () => {
    const pages: number[] = [];

    // Show previous 3 pages (if available)
    for (let i = page - 3; i < page; i++) {
      if (i >= 1) pages.push(i);
    }

    pages.push(page);

    // Show next 3 pages (if available)
    for (let i = page + 1; i <= page + 3 && i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  };

  const paginationPages = getPaginationPages();

  useEffect(() => {
    fetchData(); // Initial data fetch on component mount
  }, [fetchData]);

  return (
    <div className="flex flex-col items-center gap-[10px]">
      <div className="flex justify-center items-center mt-6 space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-500 hover:bg-gray-700 text-white"
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {paginationPages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-3 py-2 ${
              pageNumber === page
                ? "bg-blue-500 text-white rounded" // Current page styling
                : "bg-gray-200 hover:bg-gray-400"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-lg ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-500 hover:bg-gray-700 text-white"
          }`}
        >
          Next
        </button>
      </div>
      <div className="ml-4 text-l text-gray-600">
        <p>
          Page {page} of {totalPages}
        </p>
      </div>
    </div>
  );
};
