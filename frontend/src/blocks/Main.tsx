import { useState, type ChangeEvent } from "react";
import {
  CreditCard,
  HousePlus,
  MapPin,
  CalendarDays,
  Loader,
  CircleCheckBig,
} from "lucide-react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useBookingStore } from "../store/authStore";

const locations = ["CBD", "Kiamunyi", "58", "Naka"];
const bookedDates = ["2025-01-10", "2025-01-15", "2025-01-20"];

const defaultRoomPrices: Record<string, number> = {
  Studio: 2000,
  "One bedroom": 3500,
  "Two bedroom": 5000,
  "Three bedroom": 8000,
};

const cbdRoomPrices: Record<string, number> = {
  "One bedroom": 4000,
  "Two bedroom": 6000,
  "Three bedroom": 8000,
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const toLocalDate = (date: Date) =>
  date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
const formatCurrency = (amount: number) => amount.toLocaleString("en-KE");

function Main() {
  const { submitBooking } = useBookingStore();

  const [location, setLocation] = useState<string | null>(null);
  const [room, setRoom] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const isCBD = location === "CBD";
  const roomOptions = isCBD
    ? Object.keys(cbdRoomPrices)
    : Object.keys(defaultRoomPrices);

  const nightlyAmount = room
    ? isCBD
      ? cbdRoomPrices[room]
      : defaultRoomPrices[room]
    : 0;

  const bookedDateObjects = bookedDates.map((d) => new Date(d));

  const nights =
    checkIn && checkOut
      ? Math.floor(
          (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0;

  const totalAmount = nights * nightlyAmount;
  const isPhoneValid = /^\d{10}$/.test(phoneNumber);

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value.replace(/\D/g, ""));
  };

  const handleContinue = () => {
    if (!location || !room || !isPhoneValid || nights <= 0) return;
    setShowConfirmModal(true);
  };

  const handleConfirmBooking = async () => {
    setShowConfirmModal(false);
    setLoading(true);

    await submitBooking({
      location: location!,
      room: room!,
      checkIn: checkIn!.toISOString(),
      checkOut: checkOut!.toISOString(),
      nights,
      amount: totalAmount,
      phoneNumber,
    });

    setLoading(false);
    setShowSuccessModal(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };

  return (
    <>
      {/* MAIN CARD */}
      <motion.div
        className="card border-0 bg-white p-3 mx-auto"
        style={{ backdropFilter: "blur(30px)", maxWidth: "600px" }}
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        <div className="d-flex gap-3 flex-column">
          <div className="d-flex gap-3 align-items-center flex-wrap">
            {/* LOCATION */}
            <motion.div variants={fadeInUp}>
              <small className="text-muted d-flex align-items-center gap-1 mb-1">
                <MapPin size={18} /> Location
              </small>
              <select
                className="form-select border-0"
                value={location ?? ""}
                onChange={(e) => {
                  setLocation(e.target.value || null);
                  setRoom(null);
                  setCheckIn(null);
                  setCheckOut(null);
                }}
              >
                <option value="">Select</option>
                {locations.map((loc) => (
                  <option key={loc}>{loc}</option>
                ))}
              </select>
            </motion.div>

            {/* ROOMS */}
            <motion.div variants={fadeInUp} style={{ paddingLeft: 12 }}>
              <small className="text-muted d-flex align-items-center gap-1 mb-1">
                <HousePlus size={18} /> Rooms
              </small>
              <select
                className="form-select border-0"
                value={room ?? ""}
                disabled={!location}
                onChange={(e) => setRoom(e.target.value || null)}
              >
                <option value="">Select</option>
                {roomOptions.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </motion.div>

            {/* AMOUNT */}
            <motion.div variants={fadeInUp} style={{ paddingLeft: 12 }}>
              <small className="text-muted d-flex align-items-center gap-1 mb-1">
                <CreditCard size={18} /> Amount
              </small>
              <input
                className="form-control border-0"
                value={nightlyAmount || ""}
                disabled
              />
            </motion.div>
          </div>

          {/* DATES */}
          <div className="d-flex gap-2 justify-content-center flex-wrap">
            <motion.div variants={fadeInUp}>
              <DatePicker
                selected={checkIn}
                onChange={(date: Date | null) => {
                  setCheckIn(date);
                  setCheckOut(null);
                }}
                minDate={new Date()}
                excludeDates={bookedDateObjects}
                placeholderText="Check In"
                customInput={
                  <button className="btn btn-dark d-flex gap-2 align-items-center">
                    <CalendarDays size={18} />
                    {checkIn ? `Check In: ${toLocalDate(checkIn)}` : "Check In"}
                  </button>
                }
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <DatePicker
                selected={checkOut}
                onChange={(date: Date | null) => setCheckOut(date)}
                minDate={checkIn ?? new Date()}
                excludeDates={bookedDateObjects}
                disabled={!checkIn}
                placeholderText="Check Out"
                customInput={
                  <button
                    className="btn btn-dark d-flex gap-2 align-items-center"
                    disabled={!checkIn}
                  >
                    <CalendarDays size={18} />
                    {checkOut
                      ? `Check Out: ${toLocalDate(checkOut)}`
                      : "Check Out"}
                  </button>
                }
              />
            </motion.div>
          </div>

          {/* PHONE */}
          <motion.div variants={fadeInUp} className="mt-3">
            <input
              type="text"
              className="form-control"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Enter your phone number eg. 07..."
            />
          </motion.div>

          {/* SUBMIT */}
          <motion.div variants={fadeInUp}>
            <button
              className="btn btn-dark w-100"
              disabled={
                !location ||
                !room ||
                !checkIn ||
                !checkOut ||
                nights <= 0 ||
                !isPhoneValid ||
                loading
              }
              onClick={handleContinue}
            >
              {loading ? (
                <Loader className="animate-spin-loader" />
              ) : (
                "Continue"
              )}
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* CONFIRMATION MODAL */}
      {showConfirmModal && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Your Booking</h5>
              </div>
              <div className="modal-body text-center">
                <p>
                  Location: <strong>{location}</strong>
                </p>
                <p>
                  Room: <strong>{room}</strong>
                </p>
                <p>
                  Check In: <strong>{toLocalDate(checkIn!)}</strong>
                </p>
                <p>
                  Check Out: <strong>{toLocalDate(checkOut!)}</strong>
                </p>
                <p>
                  Nights: <strong>{nights}</strong>
                </p>
                <p>
                  Total: <strong>KES {formatCurrency(totalAmount)}</strong>
                </p>
                <p>
                  Phone: <strong>{phoneNumber}</strong>
                </p>
                <hr className="w-75 mx-auto" />
              </div>
              <div className="pb-2 px-4 d-flex justify-content-between">
                <button
                  className="btn btn-dark"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleConfirmBooking}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Booking Received</h5>
                <CircleCheckBig size={26} className="text-primary ms-2" />
              </div>
              <div className="modal-body text-center">
                <p>
                  Your booking is on the way. You will receive a call shortly.
                </p>
                <hr className="w-75 mx-auto" />
                <button
                  className="btn btn-primary w-75"
                  onClick={handleCloseSuccess}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Main;
