import { useState, type ChangeEvent } from "react";
import {
  CreditCard,
  HousePlus,
  MapPin,
  CalendarDays,
  Loader,
} from "lucide-react";
import { motion } from "framer-motion";

const locations = ["CBD", "Kiamunyi", "58", "Naka"];

// Mock booked dates (later from backend)
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
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Main2() {
  const [location, setLocation] = useState<string | null>(null);
  const [room, setRoom] = useState<string | null>(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<"confirm" | "payment">("confirm");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  // 🌙 NIGHTS CALCULATION
  const nights =
    checkIn && checkOut
      ? Math.floor(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const totalAmount = nights * nightlyAmount;
  const isPhoneValid = phoneNumber.length === 10;
  const closeModal = () => {
    setShowModal(false);
    setStep("confirm");
    setIsLoading(false);
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhoneNumber(value);
  };
  const handleSubmit = async () => {
    if (!isPhoneValid) return;

    setIsLoading(true);

    // Payload ready for backend + email
    const bookingPayload = {
      location,
      room,
      checkIn,
      checkOut,
      nights,
      amount: totalAmount,
      phoneNumber,
    };
    console.log("Booking payload:", bookingPayload);

    // 🔗 Replace this with API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setShowModal(true);
  };

  return (
    <>
      {/* MAIN CARD */}
      <motion.div
        className="card border-0 bg-white p-3 mx-auto"
        style={{
          backdropFilter: "blur(30px)",
          maxWidth: "600px",
        }}
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        <div>
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
                  placeholder="—"
                  disabled
                />
              </motion.div>
            </div>

            {/* DATE BUTTONS */}
            <div className="d-flex gap-2 flex-wrap align-items-start mx-auto">
              {/* CHECK IN */}
              <motion.div variants={fadeInUp}>
                <button
                  className="btn btn-dark d-flex align-items-center gap-2"
                  style={{ width: "fit-content" }}
                  onClick={() => {
                    setShowCheckIn(!showCheckIn);
                    setShowCheckOut(false);
                  }}
                >
                  <CalendarDays size={18} />
                  Check In
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

              {/* CHECK OUT */}
              <motion.div variants={fadeInUp}>
                <button
                  className="btn btn-dark d-flex align-items-center gap-2"
                  style={{ width: "fit-content" }}
                  disabled={!checkIn}
                  onClick={() => {
                    setShowCheckOut(!showCheckOut);
                    setShowCheckIn(false);
                  }}
                >
                  <CalendarDays size={18} />
                  Check Out
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
          </div>
        </div>
        <motion.div variants={fadeInUp} className="mt-4 w-100">
          <input
            type="number"
            className="form-control mx-auto"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Enter your phone number eg. 07... or 01..."
            style={{ borderRadius: "15px", width: "100%", maxWidth: "800px" }}
            required
          />
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="mb-4 form-label text-center"
          style={{ color: "#d1d1d1" }}
        >
          Your phone number where details will be sent
        </motion.p>
        <motion.div variants={fadeInUp}>
          <button
            className="btn btn-dark"
            disabled={
              !location ||
              !room ||
              !checkIn ||
              !checkOut ||
              nights <= 0 ||
              !isPhoneValid ||
              isLoading
            }
            onClick={handleSubmit}
            style={{
              borderRadius: "15px",
              width: "100%",
              maxWidth: "800px",
            }}
          >
            {isLoading ? (
              <Loader className="animate-spin-loader" size={24} />
            ) : (
              "Continue"
            )}
          </button>
        </motion.div>
      </motion.div>

      {/* MODAL */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              {step === "confirm" && (
                <>
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Booking</h5>
                  </div>

                  <div className="modal-body">
                    <p>
                      Location: <strong>{location}</strong>
                    </p>
                    <p>
                      Room: <strong>{room}</strong>
                    </p>
                    <p>
                      Check In: <strong>{checkIn}</strong>
                    </p>
                    <p>
                      Check Out: <strong>{checkOut}</strong>
                    </p>
                    <p>
                      Days: <strong>{nights}</strong>
                    </p>
                    <hr />
                    <p>
                      Total Amount: <strong>KES {totalAmount}</strong>
                    </p>
                  </div>

                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={closeModal}>
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => setStep("payment")}
                    >
                      Continue
                    </button>
                  </div>
                </>
              )}

              {step === "payment" && (
                <>
                  <div className="modal-header">
                    <h5 className="modal-title">M-Pesa Payment</h5>
                  </div>

                  <div className="modal-body">
                    <ul>
                      <li>
                        <strong>Paybill:</strong> 220022
                      </li>
                      <li>
                        <strong>Account:</strong> Booking
                      </li>
                      <li>
                        <strong>Amount:</strong> KES {totalAmount}
                      </li>
                    </ul>
                    <p className="text-muted">OR</p>
                    <p className="text-primary">
                      Send Money: <strong>0790074065</strong> (Hilda)
                    </p>
                    <p className="text-muted">
                      Complete payment then press OK.
                    </p>
                  </div>

                  <div className="modal-footer">
                    <button className="btn btn-primary" onClick={closeModal}>
                      OK
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Main2;
