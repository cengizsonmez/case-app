import React from "react";
import { capitalizeFirstLetter } from "../../utils/commanUtils";

interface IGridRowProps {
  bike_id?: string;
  vehicle_type?: string;
  handleDetailsClick: (bikeId: string) => void;
}

export const GridRow: React.FC<IGridRowProps> = ({
  bike_id,
  vehicle_type,
  handleDetailsClick,
}) => {
  return (
    <tr key={bike_id}>
      <td className="border border-gray-200 px-4 py-2">{bike_id}</td>
      <td className="border border-gray-200 px-4 py-2">{vehicle_type && capitalizeFirstLetter(vehicle_type)}</td>
      <td className="border border-gray-200 px-4 py-2">
        <button
          onClick={() => bike_id && handleDetailsClick(bike_id)}
          disabled={!bike_id}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            !bike_id && "cursor-not-allowed opacity-50"
          }`}
        >
          Details
        </button>
      </td>
    </tr>
  );
};
