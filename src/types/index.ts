export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  role: "admin" | "staff";
}

export interface Cabin {
  id: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  nationalId: string;
  nationality: string;
  countryFlag: string;
}

export interface Booking {
  id: string;
  cabinId: string;
  cabin: Cabin;
  guestName: string;
  guestEmail: string;
  guestNationalId: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  hasBreakfast: boolean;
  observations: string;
  createdAt: string;
}

export interface Settings {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export interface SalesData {
  date: string;
  total: number;
  extras: number;
}

export interface StayDuration {
  duration: string;
  value: number;
  color: string;
}

export interface TodayActivity {
  name: string;
  status: "arriving" | "departing";
  nights: number;
  flag: string;
}

export type BookingStatus =
  | "all"
  | "unconfirmed"
  | "checked-in"
  | "checked-out";
export type SortOrder = "date-desc" | "date-asc";
