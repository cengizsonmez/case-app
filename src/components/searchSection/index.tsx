import React from "react";
import { capitalizeFirstLetter } from "../../utils/commanUtils";

interface ISearchSectionProps {
  filter: string;
  handleFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  search: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  vehicleTypes: string[];
}

export const SearchSection: React.FC<ISearchSectionProps> = ({
  filter,
  handleFilterChange,
  search,
  handleSearchChange,
  vehicleTypes,
}) => {
  return (
    <div className="mb-4">
      <label className="mr-2">Search by ID:</label>
      <input type="text" value={search} onChange={handleSearchChange} className="border p-2" data-testid="search-input"/>
      <label className="ml-4 mr-2">Filter by Type:</label>
      <select value={filter} onChange={handleFilterChange} className="border p-2" data-testid="filter-select">
        <option value="">All</option>
        {vehicleTypes.map((type) => (
          <option key={type} value={type}>{capitalizeFirstLetter(type)}</option>
        ))}
      </select>
    </div>
  );
};
