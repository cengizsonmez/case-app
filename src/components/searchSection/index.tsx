import React from "react";

interface ISearchSectionProps {
  filter: string;
  search: string;
  loading: boolean;
  handleFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchSection: React.FC<ISearchSectionProps> = ({
  filter,
  search,
  loading,
  handleFilterChange,
  handleSearchChange,
}) => {
  return (
    <div className="mb-4">
      <label className="mr-2">Search by ID:</label>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        className={`border p-2 ${
          loading && "cursor-not-allowed"
        }`}
        disabled={loading}
      />
      <label className="ml-4 mr-2">Filter by Type:</label>
      <select
        value={filter}
        onChange={handleFilterChange}
        className={`border p-2 ${
          loading && "cursor-not-allowed"
        }`}
        disabled={loading}
      >
        <option value="">All</option>
        <option value="scooter">Scooter</option>
        <option value="bike">Bike</option>
      </select>
    </div>
  );
};
