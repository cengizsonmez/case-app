import React from "react";
import { IBike } from "../../types";
import { formatKey, gridValueCheck } from "../../utils/commanUtils";

interface IDetailModalProps {
  isOpen: boolean;
  closeModal: () => void;
  bikeDetails: IBike;
}

export const DetailModal: React.FC<IDetailModalProps> = ({
  isOpen,
  closeModal,
  bikeDetails,
}) => {
  return isOpen ? (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-lg font-bold mb-2">Bike Details</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Attribute</th>
              <th className="border px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(bikeDetails).map(([key, value]) => (
              <tr key={key}>
                <td className="border px-4 py-2">{formatKey(key)}</td>
                <td className="border px-4 py-2">
                  {gridValueCheck(key, value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 text-white px-2 py-1 rounded mt-2"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
