import { useQuery } from "@tanstack/react-query";
import type {
  Cabin,
  Booking,
  Settings,
  SalesData,
  StayDuration,
  TodayActivity,
} from "../types";
import {
  mockBookings,
  mockCabins,
  mockSalesData,
  mockStayDuration,
  mockTodayActivity,
  mockSettings,
} from "../mockData";

// Mock API delay to simulate network
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API functions - replace these with real API calls later
const api = {
  getCabins: async (): Promise<Cabin[]> => {
    await delay(500);
    return mockCabins;
  },

  getBookings: async (): Promise<Booking[]> => {
    await delay(600);
    return mockBookings;
  },

  getSettings: async (): Promise<Settings> => {
    await delay(300);
    return mockSettings;
  },

  getSalesData: async (): Promise<SalesData[]> => {
    await delay(700);
    return mockSalesData;
  },

  getStayDurations: async (): Promise<StayDuration[]> => {
    await delay(500);
    return mockStayDuration;
  },

  getTodayActivity: async (): Promise<TodayActivity[]> => {
    await delay(400);
    return mockTodayActivity;
  },
};

// Custom hooks for each data type
export function useCabins() {
  return useQuery({
    queryKey: ["cabins"],
    queryFn: api.getCabins,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: api.getBookings,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: api.getSettings,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useSalesData() {
  return useQuery({
    queryKey: ["salesData"],
    queryFn: api.getSalesData,
    staleTime: 5 * 60 * 1000,
  });
}

export function useStayDurations() {
  return useQuery({
    queryKey: ["stayDurations"],
    queryFn: api.getStayDurations,
    staleTime: 5 * 60 * 1000,
  });
}

export function useTodayActivity() {
  return useQuery({
    queryKey: ["todayActivity"],
    queryFn: api.getTodayActivity,
    staleTime: 1 * 60 * 1000, // 1 minute (more frequent updates)
  });
}
