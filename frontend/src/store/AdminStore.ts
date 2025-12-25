import { create } from "zustand";
import { fetchAllBookings } from "../api/api";

export interface Booking {
  _id: string;
  location: string;
  room: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  amount: number;
  phoneNumber: string;
  status: string;
  createdAt: string;
}

interface AdminBookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  loadBookings: () => Promise<void>;
}

export const useAdminBookingStore = create<AdminBookingState>((set) => ({
  bookings: [],
  loading: false,
  error: null,

  loadBookings: async () => {
    try {
      set({ loading: true, error: null });
      const data = await fetchAllBookings();
      set({ bookings: data, loading: false });
    } catch (err: any) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to load bookings",
      });
    }
  },
}));
