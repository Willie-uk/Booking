import { Request, Response } from "express";
import { Booking } from "../models/booking";
import { sendBookingEmail } from "../email/email";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { location, room, checkIn, checkOut, nights, amount, phoneNumber } =
      req.body;

    // ✅ Basic validation
    if (
      !location ||
      !room ||
      !checkIn ||
      !checkOut ||
      !nights ||
      !amount ||
      !phoneNumber
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    // ✅ Save booking
    const booking = await Booking.create({
      location,
      room,
      checkIn,
      checkOut,
      nights,
      amount,
      phoneNumber,
      status: "pending", // ensure default exists
    });

    // ✅ Send email to admin
    await sendBookingEmail({
      location: booking.location,
      room: booking.room,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      nights: booking.nights,
      amount: booking.amount,
      phoneNumber: booking.phoneNumber,
      status: booking.status,
      createdAt: booking.createdAt.toLocaleString(), // ✅ FIX
    });

    return res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return res.status(500).json({
      message: "Server error while creating booking",
    });
  }
};

export const getAllBookings = async (_: Request, res: Response) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
};

export const adminPass = (req: Request, res: Response) => {
  const { pass } = req.body;

  if (!pass) {
    return res
      .status(400)
      .json({ success: false, message: "Password is required" });
  }

  if (pass === process.env.ADMIN_PASS) {
    return res.status(200).json({ success: true, message: "Access allowed" });
  } else {
    return res.status(403).json({ success: false, message: "Access denied" });
  }
};

export const deleteBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Booking ID is required" });
    }

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Delete booking error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
