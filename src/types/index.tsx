export interface IBike {
    bike_id: string;
    lat: number;
    lon: number;
    is_reserved: boolean | number;
    is_disabled: boolean | number;
    vehicle_type?: string;
    total_bookings: string | number;
    android: string;
    ios: string;
  }