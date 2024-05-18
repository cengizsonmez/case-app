import React, { useEffect, useState } from "react";
import { IBike } from "../../types";
import { GridRow } from "../gridRow";

interface IGridProps {
  bikes: IBike[];
  handleDetailsClick: (bikeId: string) => void;
}

export const Grid: React.FC<IGridProps> = ({ bikes, handleDetailsClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(bikes.length / pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [bikes])
  

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, bikes.length);
  const currentPageData = bikes.slice(startIndex, endIndex);

  return (
    <div>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Bike ID</th>
            <th className="border border-gray-200 px-4 py-2">Vehicle Type</th>
            <th className="border border-gray-200 px-4 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map(
            (bike) =>
              bike && (
                <GridRow
                  key={bike.bike_id}
                  bike={bike}
                  handleDetailsClick={handleDetailsClick}
                />
              )
          )}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${
            currentPage === 1 &&
            "cursor-not-allowed opacity-50 hover:bg-gray-300"
          }`}
        >
          Previous Page
        </button>
        <p className="text-gray-800 font-bold py-2 px-4">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNextPage}
          className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${
            currentPage === totalPages &&
            "cursor-not-allowed opacity-50 hover:bg-gray-300"
          }`}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};
