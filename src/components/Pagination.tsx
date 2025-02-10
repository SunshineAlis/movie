"use client";
import { useEffect, useState } from "react";

export const Pagination = ({
  fetchData,
  totalPages,
}: {
  fetchData: (page: number) => void; // page параметртэй
  totalPages: number;
}) => {
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchData(page); // Хуудас солигдоход fetchData() ажиллана
  }, [page]); // Зөвхөн `page` өөрчлөгдөх үед

  const getPaginationPages = () => {
    const pages: number[] = [];
    for (
      let i = Math.max(1, page - 3);
      i <= Math.min(totalPages, page + 3);
      i++
    ) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-[10px]">
      <div className="flex justify-center items-center mt-6 space-x-2">
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

        {getPaginationPages().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-3 py-2 ${
              pageNumber === page
                ? "bg-blue-500 text-white rounded"
                : "bg-gray-200 hover:bg-gray-400"
            }`}
          >
            {pageNumber}
          </button>
        ))}

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
