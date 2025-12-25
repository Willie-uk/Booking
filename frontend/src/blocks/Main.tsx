import { useState, type ChangeEvent } from "react";
import {
  CreditCard,
  HousePlus,
  MapPin,
  CalendarDays,
  Loader,
} from "lucide-react";
import { motion } from "framer-motion";
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
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const toLocalDate = (date: string) =>
  new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

function Main() {
  const { submitBooking } = useBookingStore();

  const [location, setLocation] = useState<string | null>(null);
  const [room, setRoom] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
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

  const today = new Date().toISOString().split("T")[0];
  const isDateBooked = (date: string) => bookedDates.includes(date);

  const nights =
    checkIn && checkOut
      ? Math.floor(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
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
      checkIn,
      checkOut,
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
              <div className="d-flex align-items-center gap-1 mb-1">
                <MapPin size={18} color="#999" />
                <small className="text-muted">Location</small>
              </div>
              <select
                className="form-select border-0 pe-5 ps-2 py-1"
                value={location ?? ""}
                onChange={(e) => {
                  setLocation(e.target.value || null);
                  setRoom(null);
                  setCheckIn("");
                  setCheckOut("");
                }}
              >
                <option value="">Select</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* ROOMS */}
            <motion.div
              variants={fadeInUp}
              style={{ borderLeft: "1px solid #ddd", paddingLeft: 12 }}
            >
              <div className="d-flex align-items-center gap-1 mb-1">
                <HousePlus size={18} color="#999" />
                <small className="text-muted">Rooms</small>
              </div>
              <select
                className="form-select border-0 pe-5 ps-2 py-1"
                value={room ?? ""}
                onChange={(e) => setRoom(e.target.value || null)}
                disabled={!location}
              >
                <option value="">Select</option>
                {roomOptions.map((roomType) => (
                  <option key={roomType} value={roomType}>
                    {roomType}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* AMOUNT */}
            <motion.div
              variants={fadeInUp}
              style={{ borderLeft: "1px solid #ddd", paddingLeft: 12 }}
            >
              <div className="d-flex align-items-center gap-1 mb-1">
                <CreditCard size={18} color="#999" />
                <small className="text-muted">Amount</small>
              </div>
              <input
                className="form-control border-0 ps-3 py-1"
                value={nightlyAmount || ""}
                disabled
              />
            </motion.div>
          </div>

          {/* DATES */}
          <div className="d-flex gap-2 flex-wrap align-items-start mx-auto">
            <motion.div variants={fadeInUp}>
              <button
                className="btn btn-dark d-flex align-items-center gap-2"
                onClick={() => {
                  setShowCheckIn(!showCheckIn);
                  setShowCheckOut(false);
                }}
              >
                <CalendarDays size={18} />
                {checkIn ? `Check In: ${toLocalDate(checkIn)}` : "Check In"}
              </button>
              {showCheckIn && (
                <input
                  type="date"
                  className="form-control mt-1"
                  min={today}
                  value={checkIn}
                  onChange={(e) => {
                    if (!isDateBooked(e.target.value)) {
                      setCheckIn(e.target.value);
                      setCheckOut("");
                    }
                  }}
                />
              )}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <button
                className="btn btn-dark d-flex align-items-center gap-2"
                disabled={!checkIn}
                onClick={() => {
                  setShowCheckOut(!showCheckOut);
                  setShowCheckIn(false);
                }}
              >
                <CalendarDays size={18} />
                {checkOut ? `Check Out: ${toLocalDate(checkOut)}` : "Check Out"}
              </button>
              {showCheckOut && (
                <input
                  type="date"
                  className="form-control mt-1"
                  min={checkIn}
                  value={checkOut}
                  onChange={(e) => {
                    if (!isDateBooked(e.target.value)) {
                      setCheckOut(e.target.value);
                    }
                  }}
                />
              )}
            </motion.div>
          </div>

          {/* PHONE */}
          <motion.div variants={fadeInUp} className="mt-4">
            <input
              type="text"
              className="form-control"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Enter your phone number eg. 07... or 01..."
              required
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
                <Loader className="animate-spin-loader" size={24} />
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
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Your Booking</h5>
              </div>
              <div className="modal-body text-start">
                <p>
                  Location: <strong>{location}</strong>
                </p>
                <p>
                  Room: <strong>{room}</strong>
                </p>
                <p>
                  Check In: <strong>{toLocalDate(checkIn)}</strong>
                </p>
                <p>
                  Check Out: <strong>{toLocalDate(checkOut)}</strong>
                </p>
                <p>
                  Nights: <strong>{nights}</strong>
                </p>
                <p>
                  Total Amount: KES <strong>{totalAmount}</strong>
                </p>
                <p>
                  Phone Number: <strong>{phoneNumber}</strong>
                </p>
                <hr className="w-75" />
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  className="btn btn-secondary"
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
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Booking Received</h5>
              </div>
              <div className="modal-body text-center">
                <p>
                  Your booking is on the way. You will receive a call shortly.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
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
