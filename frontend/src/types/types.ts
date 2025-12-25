export interface BookingPayload {
  location: string;
  room: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  amount: number;
  phoneNumber: string;
}
