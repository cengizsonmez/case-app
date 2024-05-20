import React from "react";
import { IBike } from "../../types";
import { GridRow } from "../gridRow";

interface IGridProps {
  bikes: IBike[];
  handleDetailsClick: (bikeId: string) => void;
}

export const Grid: React.FC<IGridProps> = ({ bikes, handleDetailsClick }) => {
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
          {bikes.map((bike) => (
            <GridRow
              bike_id={bike?.bike_id}
              vehicle_type={bike?.vehicle_type}
              handleDetailsClick={handleDetailsClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
