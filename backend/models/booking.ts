import { Schema, model, Document } from "mongoose";

export interface BookingDocument extends Document {
  location: string;
  room: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  amount: number;
  phoneNumber: string;
  createdAt: Date;
  status: "pending" | "confirmed" | "cancelled";
}

const bookingSchema = new Schema<BookingDocument>(
  {
    location: { type: String, required: true },
    room: { type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    nights: { type: Number, required: true },
    amount: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Booking = model<BookingDocument>("Booking", bookingSchema);
