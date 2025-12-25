import express from "express";
import cors from "cors";
import bookingRoutes from "./routes/routes";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/api/bookings", bookingRoutes);

export default app;
