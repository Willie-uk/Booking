import { Router } from "express";
import {
  adminPass,
  createBooking,
  deleteBookingById,
  getAllBookings,
} from "../controller/controller";

const router = Router();

router.post("/", createBooking);
router.get("/admin", getAllBookings);
router.post("/bypass", adminPass);
router.delete("/:id", deleteBookingById);

export default router;
