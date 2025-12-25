import { create } from "zustand";
import type { BookingPayload } from "../types/types";
import { createBooking } from "../api/api";

interface BookingState {
  loading: boolean;
  error: string | null;
  success: boolean;

  submitBooking: (payload: BookingPayload) => Promise<void>;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  loading: false,
  error: null,
  success: false,

  submitBooking: async (payload) => {
    try {
      set({ loading: true, error: null, success: false });
      await createBooking(payload);
      set({ success: true });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Booking failed",
      });
    } finally {
      set({ loading: false });
    }
  },

  reset: () => set({ loading: false, error: null, success: false }),
}));
