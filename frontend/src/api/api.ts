import axios from "axios";
import type { BookingPayload } from "../types/types";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  withCredentials: true,
});

// 🔐 Admin pass verification
export const verifyAdminPass = async (pass: string) => {
  const res = await API.post("/bookings/bypass", { pass });
  return res.data;
};

// 📥 Create booking
export const createBooking = async (payload: BookingPayload) => {
  const { data } = await API.post("/bookings", payload);
  return data;
};

// 📊 Admin fetch bookings
export const fetchAllBookings = async () => {
  const res = await API.get("/bookings/admin");
  return res.data;
};

export const deleteBooking = async (id: string) => {
  const res = await API.delete(`/bookings/${id}`);
  return res.data;
};
