import React from "react";
import { capitalizeFirstLetter } from "../../utils/commanUtils";
import { IBike } from "../../types";

interface IGridRowProps {
  bike: IBike;
  handleDetailsClick: (bikeId: string) => void;
}

export const GridRow: React.FC<IGridRowProps> = ({
  bike,
  handleDetailsClick,
}) => {
  return (
    <tr key={bike.bike_id} data-testid={`grid-row-${bike.bike_id}`}>
      <td className="border border-gray-200 px-4 py-2">{bike.bike_id}</td>
      <td className="border border-gray-200 px-4 py-2">{capitalizeFirstLetter(bike.vehicle_type)}</td>
      <td className="border border-gray-200 px-4 py-2">
        <button
          onClick={() => handleDetailsClick(bike.bike_id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Details
        </button>
      </td>
    </tr>
  );
};
