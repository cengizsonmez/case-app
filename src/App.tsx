import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  DetailModal,
  Grid,
  SearchSection,
  TotalBookingsCounter,
} from "./components";
import { IBike } from "./types";

const API_URL = process.env.REACT_APP_API_URL || "";

const App: React.FC = () => {
  const [bikes, setBikes] = useState<IBike[]>([]);
  const [filteredBikes, setFilteredBikes] = useState<IBike[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedBike, setSelectedBike] = useState<IBike>();
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
  const [ttl, setTtl] = useState<number>(0);
  const [refreshCountdown, setRefreshCountdown] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const prevRefreshCountdown = useRef<number | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      const { data, ttl } = response.data;
      data.bikes = data.bikes.filter(
        (bike: IBike) => bike !== null && Object.keys(bike).length > 0
      );
      setBikes(data.bikes);
      if (filter || search) {
        filterBikes(data.bikes);
      } else {
        setFilteredBikes(data.bikes);
      }
      const types: string[] = data.bikes
        .filter((bike: IBike) => bike.vehicle_type)
        .map((bike: IBike) => bike.vehicle_type);
      const uniqueTypes: string[] = Array.from(new Set(types));
      setVehicleTypes(uniqueTypes);
      setTtl(ttl);
    } catch (error) {
      console.error("Error fetching data:", error);
      fetchData();
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalBookings = (bikesList: IBike[]) => {
    const total = bikesList.reduce((acc, bike) => {
      if (bike && bike.total_bookings) {
        return acc + Number(bike.total_bookings);
      } else {
        return acc;
      }
    }, 0);
    setTotalBookings(total);
  };

  const filterBikes = (bikes: IBike[]) => {
    let filtered = bikes;
    if (filter) {
      filtered = bikes.filter(
        (bike) => bike.vehicle_type && bike.vehicle_type.includes(filter)
      );
    }
    if (search) {
      filtered = filtered.filter((bike) =>
        bike.bike_id.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredBikes(filtered);
  };

  useEffect(() => {
    if (ttl > 0) {
      setRefreshCountdown(ttl);
      const interval = setInterval(() => {
        prevRefreshCountdown.current = refreshCountdown;
        setRefreshCountdown((prevCountdown) =>
          prevCountdown ? prevCountdown - 1 : 0
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [ttl]);

  useEffect(() => {
    if (refreshCountdown === 0) {
      fetchData();
    }
  }, [refreshCountdown]);

  useEffect(() => {
    filterBikes(bikes);
  }, [filter, search]);

  useEffect(() => {
    calculateTotalBookings(filteredBikes);
  }, [filteredBikes]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleDetailsClick = async (bikeId: string) => {
    const selectedBike = bikes.find((bike) => bike.bike_id === bikeId);
    if (selectedBike) {
      setSelectedBike(selectedBike);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bikes List</h1>
      <div className="flex justify-between mb-4">
        <SearchSection
          filter={filter}
          handleFilterChange={handleFilterChange}
          search={search}
          handleSearchChange={handleSearchChange}
          vehicleTypes={vehicleTypes}
        />
        <TotalBookingsCounter
          totalBookings={totalBookings}
          refreshCountdown={refreshCountdown}
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      ) : (
        <Grid bikes={filteredBikes} handleDetailsClick={handleDetailsClick} />
      )}
      {selectedBike && modalOpen && (
        <DetailModal
          isOpen={modalOpen}
          closeModal={closeModal}
          bikeDetails={selectedBike}
        />
      )}
    </div>
  );
};

export default App;
