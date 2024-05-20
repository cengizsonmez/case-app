import React from "react";

interface IInfoBoxProps {
  totalBookings: number;
  refreshCountdown: number;
}

export const TotalBookingsCounter: React.FC<IInfoBoxProps> = ({
  totalBookings,
  refreshCountdown,
}) => {
  return (
    <div>
      <p>Will refresh in: {refreshCountdown} seconds</p>
      <p>Total Bookings of Listed Bikes: {totalBookings}</p>
    </div>
  );
};
