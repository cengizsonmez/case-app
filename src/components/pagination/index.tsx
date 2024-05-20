import React from "react";

interface IPaginationProps {
  currentPage: number;
  totalPageCount: number;
  hasNextPage: boolean;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

export const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPageCount,
  hasNextPage,
  handlePrevPage,
  handleNextPage,
}) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${
          currentPage === 1 && "cursor-not-allowed opacity-50 hover:bg-gray-300"
        }`}
      >
        Previous Page
      </button>
      <p className="text-gray-800 font-bold py-2 px-4">
        Page {currentPage} of {totalPageCount}
      </p>
      <button
        onClick={handleNextPage}
        disabled={!hasNextPage}
        className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${
          !hasNextPage && "cursor-not-allowed opacity-50 hover:bg-gray-300"
        }`}
      >
        Next Page
      </button>
    </div>
  );
};
