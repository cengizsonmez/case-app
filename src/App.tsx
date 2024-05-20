import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  DetailModal,
  Grid,
  Pagination,
  SearchSection,
  TotalBookingsCounter,
} from "./components";
import { IBike } from "./types";

const API_URL = process.env.REACT_APP_API_URL || "";

const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const bike_id = searchParams.get("bike_id") || "";
  const vehicle_type = searchParams.get("vehicle_type") || "";
  const page = parseInt(searchParams.get("page") || "1");

  const [bikes, setBikes] = useState<IBike[]>([]);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedBike, setSelectedBike] = useState<IBike>();
  const [ttl, setTtl] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [refreshCountdown, setRefreshCountdown] = useState<number>(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (ttl > 0) {
      setRefreshCountdown(ttl);
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setRefreshCountdown((prevCountdown) =>
          prevCountdown ? prevCountdown - 1 : 0
        );
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [ttl]);

  useEffect(() => {
    if (refreshCountdown === 0) {
      fetchData(
        searchParams.get("bike_id"),
        searchParams.get("vehicle_type"),
        searchParams.get("page"),
      );
    }
  }, [refreshCountdown]);

  const fetchData = async (
    bikeId: string | null,
    vehicleType: string | null,
    page: string | null,
  ) => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        params: {
          page,
          bike_id: bikeId,
          vehicle_type: vehicleType,
        },
      });
      const { data, ttl, total_count, nextPage } = response.data;
      setBikes(data.bike ? [data.bike] : data.bikes);
      setHasNextPage(nextPage);
      setTotalPageCount(Math.round(total_count / 10));
      setTtl(ttl);
    } catch (error) {
      console.error("Error fetching data:", error);
      fetchData(
        searchParams.get("bike_id"),
        searchParams.get("vehicle_type"),
        searchParams.get("page")
      );
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalBookings = (bikesList: IBike[]) => {
    const total = bikesList?.reduce((acc, bike) => {
      if (bike && bike.total_bookings) {
        return acc + Number(bike.total_bookings);
      } else {
        return acc;
      }
    }, 0);
    setTotalBookings(total);
  };

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    fetchData(
      searchParams.get("bike_id"),
      searchParams.get("vehicle_type"),
      searchParams.get("page")
    );
  }, [searchParams]);

  useEffect(() => {
    calculateTotalBookings(bikes);
  }, [bikes]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSearchParams({
      bike_id: "",
      vehicle_type: value,
      page: String(currentPage),
    });
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchParams({
      bike_id: value,
      vehicle_type: "",
      page: String(currentPage),
    });
    setCurrentPage(1);
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

  const handleNextPage = () => {
    const currentPage = page + 1;
    setSearchParams({
      bike_id,
      vehicle_type,
      page: String(currentPage),
      pageDirection: "next",
    });
  };

  const handlePrevPage = () => {
    const currentPage = page ? Number(page) - 1 : "";
    setSearchParams({
      bike_id,
      vehicle_type,
      page: String(currentPage),
      pageDirection: "prev",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bikes List</h1>
      <div className="flex justify-between mb-4">
        <SearchSection
          filter={vehicle_type}
          search={bike_id}
          loading={loading}
          handleFilterChange={handleFilterChange}
          handleSearchChange={handleSearchChange}
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
        <>
          <Grid bikes={bikes} handleDetailsClick={handleDetailsClick} />
          {hasNextPage !== undefined && (
            <Pagination
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              currentPage={page}
              totalPageCount={totalPageCount}
              hasNextPage={hasNextPage}
            />
          )}
        </>
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
