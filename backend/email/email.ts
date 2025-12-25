import nodemailer from "nodemailer";
import { bookingEmailTemplate } from "./emailTemplate";

interface BookingEmailData {
  location: string;
  room: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  amount: number;
  phoneNumber: string;
  createdAt?: string;
  status: string;
}

export const sendBookingEmail = async (data: BookingEmailData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Kwagala Homes" <${process.env.ADMIN_EMAIL}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "New Booking Request",
    html: bookingEmailTemplate(data), // ✅ IMPORTANT
  });
};
