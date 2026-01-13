import type {
  Cabin,
  Booking,
  Settings,
  SalesData,
  StayDuration,
  TodayActivity,
} from "../types";

export const mockCabins: Cabin[] = [
  {
    id: "1",
    name: "Sunset Suite",
    maxCapacity: 4,
    regularPrice: 450,
    discount: 50,
    description: "Luxurious suite with panoramic sunset views",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  },
  {
    id: "2",
    name: "Forest Retreat",
    maxCapacity: 2,
    regularPrice: 350,
    discount: 25,
    description: "Cozy cabin nestled in the forest",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
  },
  {
    id: "3",
    name: "Mountain View",
    maxCapacity: 6,
    regularPrice: 650,
    discount: 100,
    description: "Spacious lodge with mountain vistas",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
  },
  {
    id: "4",
    name: "Lakeside Haven",
    maxCapacity: 3,
    regularPrice: 400,
    discount: 30,
    description: "Peaceful retreat by the lake",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
  },
  {
    id: "5",
    name: "Garden Cottage",
    maxCapacity: 2,
    regularPrice: 300,
    discount: 0,
    description: "Charming cottage surrounded by gardens",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  },
];

export const mockBookings: Booking[] = [
  {
    id: "2719",
    cabinId: "3",
    cabin: mockCabins[2],
    guestName: "Sarah Johnson",
    guestEmail: "sarah.j@email.com",
    guestNationalId: "US123456",
    startDate: "2026-01-15",
    endDate: "2026-01-18",
    numNights: 3,
    numGuests: 4,
    totalPrice: 1650,
    status: "unconfirmed",
    hasBreakfast: false,
    observations: "Late check-in requested",
    createdAt: "2026-01-10T10:30:00",
  },
  {
    id: "2720",
    cabinId: "1",
    cabin: mockCabins[0],
    guestName: "Michael Chen",
    guestEmail: "mchen@email.com",
    guestNationalId: "CA789012",
    startDate: "2026-01-12",
    endDate: "2026-01-14",
    numNights: 2,
    numGuests: 2,
    totalPrice: 800,
    status: "checked-in",
    hasBreakfast: true,
    observations: "Anniversary celebration",
    createdAt: "2026-01-08T14:20:00",
  },
  {
    id: "2721",
    cabinId: "2",
    cabin: mockCabins[1],
    guestName: "Emma Davis",
    guestEmail: "emma.d@email.com",
    guestNationalId: "UK345678",
    startDate: "2026-01-10",
    endDate: "2026-01-13",
    numNights: 3,
    numGuests: 2,
    totalPrice: 975,
    status: "checked-out",
    hasBreakfast: true,
    observations: "",
    createdAt: "2026-01-05T09:15:00",
  },
  {
    id: "2722",
    cabinId: "4",
    cabin: mockCabins[3],
    guestName: "Alex Turner",
    guestEmail: "alex.turner@email.com",
    guestNationalId: "AU234567",
    startDate: "2026-01-16",
    endDate: "2026-01-20",
    numNights: 4,
    numGuests: 3,
    totalPrice: 1480,
    status: "unconfirmed",
    hasBreakfast: true,
    observations: "Honeymoon package",
    createdAt: "2026-01-09T11:45:00",
  },
];

export const mockSettings: Settings = {
  minBookingLength: 3,
  maxBookingLength: 90,
  maxGuestsPerBooking: 8,
  breakfastPrice: 15,
};

export const mockSalesData: SalesData[] = [
  { date: "Jan 05", total: 4200, extras: 300 },
  { date: "Jan 06", total: 5400, extras: 450 },
  { date: "Jan 07", total: 3800, extras: 280 },
  { date: "Jan 08", total: 6200, extras: 520 },
  { date: "Jan 09", total: 5100, extras: 380 },
  { date: "Jan 10", total: 7300, extras: 680 },
  { date: "Jan 11", total: 6800, extras: 550 },
];

export const mockStayDuration: StayDuration[] = [
  { duration: "2 nights", value: 25, color: "#d4af37" },
  { duration: "3 nights", value: 35, color: "#c87461" },
  { duration: "4-5 nights", value: 20, color: "#7a987a" },
  { duration: "8-14 nights", value: 20, color: "#5a7869" },
];

export const mockTodayActivity: TodayActivity[] = [
  { name: "Jonas Schmedtmann", status: "departing", nights: 5, flag: "🇩🇪" },
  { name: "David Smith", status: "arriving", nights: 11, flag: "🇺🇸" },
  { name: "Maria Rodriguez", status: "departing", nights: 2, flag: "🇪🇸" },
  { name: "Abdul Rahman", status: "arriving", nights: 5, flag: "🇸🇦" },
];
