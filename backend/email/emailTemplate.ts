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

export const bookingEmailTemplate = (data: BookingEmailData) => {
  const formattedDate = data.createdAt
    ? new Date(data.createdAt).toLocaleString("en-KE", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "N/A";

  const formatCurrency = (amount: number) => amount.toLocaleString("en-KE");
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Booking Request</title>
  </head>
  <body style="background: #f6f6f6; padding: 20px">
    <div
      style="
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        border-radius: 20px;
        padding: 20px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
          sans-serif;
        font-size: 14px;
        color: #333;
        text-align: center;
        border: 1px solid #ccc;
      "
    >
      <h2 style="color: #555">New Booking Request</h2>
      <hr style="margin: 20px 0" />

      <p>Location: <strong>${data.location}</strong></p>
      <p>Room: <strong>${data.room}</strong></p>
      <p>Check In: <strong>${formatDate(data.checkIn)}</strong></p>
      <p>Check Out: <strong>${formatDate(data.checkOut)}</strong></p>
      <p>Nights: <strong>${data.nights}</strong></p>
      <p>Total: KES <strong>${formatCurrency(data.amount)}</strong></p>
      <p>Phone Number: <strong>${data.phoneNumber}</strong></p>
      <p>Approval is <strong>${data.status}</strong></p>
      <p style="font-style: italic; color: gray">Received on <strong>${formattedDate}</strong></p>

      <hr style="margin: 20px 0" />
      <p>Kindly confirm this bookings.</p>
      <p style="font-style: italic; color: gray">Kwagala Homes Tech Team.</p>
    </div>
  </body>
</html>

`;
};
