import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { verifyAdminPass, deleteBooking } from "../api/api";
import { useAdminBookingStore, type Booking } from "../store/AdminStore";

const AdminDashboard: React.FC = () => {
  const { bookings, loading, error, loadBookings } = useAdminBookingStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  // 🗑 Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();

  // 🔐 Verify admin password
  const handleAdminVerify = async () => {
    try {
      setVerifying(true);
      const res = await verifyAdminPass(adminPass);

      if (res.success) {
        setIsVerified(true);
        setVerifyError("");
      } else {
        setVerifyError(res.message || "Access denied");
      }
    } catch (err: any) {
      setVerifyError(err.response?.data?.message || "Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  // ⏱ Clear verify error
  useEffect(() => {
    if (!verifyError) return;
    const timer = setTimeout(() => setVerifyError(""), 2000);
    return () => clearTimeout(timer);
  }, [verifyError]);

  // 📥 Load bookings AFTER verification
  useEffect(() => {
    if (isVerified) loadBookings();
  }, [isVerified, loadBookings]);

  // 🗑 Open delete modal
  const openDeleteModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  };

  // 🗑 Confirm delete
  const confirmDelete = async () => {
    if (!selectedBooking) return;

    try {
      setDeleting(true);
      await deleteBooking(selectedBooking._id);
      setShowDeleteModal(false);
      setSelectedBooking(null);
      loadBookings();
    } finally {
      setDeleting(false);
    }
  };

  const filteredBookings = bookings.filter((b) =>
    `${b.location} ${b.room} ${b.phoneNumber} ${b.status}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // 🔐 ADMIN LOGIN VIEW
  if (!isVerified) {
    return (
      <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
        <h3 className="mb-3">Admin Pass Required</h3>

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Enter Admin Pass"
          value={adminPass}
          onChange={(e) => setAdminPass(e.target.value)}
          style={{ maxWidth: "300px", borderRadius: "10px" }}
        />

        <button
          className="btn btn-dark"
          onClick={handleAdminVerify}
          disabled={verifying}
        >
          {verifying ? "Verifying..." : "Verify"}
        </button>

        {verifyError && (
          <div
            className="bg-danger fixed-top w-75 mx-auto mt-3 py-1"
            style={{ borderRadius: "15px", zIndex: 1051 }}
          >
            <p className="text-center text-white m-0">{verifyError}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="container mt-4" style={{ overflowX: "auto" }}>
        <h1 className="my-5">
          All <span className="text-secondary fw-bold">BNB</span> Bookings
        </h1>

        <input
          type="text"
          placeholder="Search bookings..."
          className="form-control mb-4"
          style={{ maxWidth: "400px", borderRadius: "10px" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <div className="d-flex justify-content-center">
            <Loader className="animate-spin-loader" size={24} />
          </div>
        ) : (
          <motion.table
            className="table table-striped"
            style={{ minWidth: "1200px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Location</th>
                <th>Room</th>
                <th>Dates</th>
                <th>Nights</th>
                <th>Amount</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b, i) => (
                <tr key={b._id}>
                  <td>{i + 1}</td>
                  <td>{b.location}</td>
                  <td>{b.room}</td>
                  <td>
                    {new Date(b.checkIn).toDateString()} →{" "}
                    {new Date(b.checkOut).toDateString()}
                  </td>
                  <td>{b.nights}</td>
                  <td>KES {b.amount}</td>
                  <td>{b.phoneNumber}</td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      {b.status}
                    </span>
                  </td>
                  <td>{new Date(b.createdAt).toLocaleString()}</td>
                  <td>
                    <Trash2
                      className="text-danger mb-2"
                      onClick={() => openDeleteModal(b)}
                      size={20}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        )}

        <button
          className="btn btn-dark my-3 px-4"
          onClick={() => navigate("/", { replace: true })}
        >
          Home
        </button>
      </div>

      {/* 🗑 DELETE CONFIRM MODAL */}
      {showDeleteModal && selectedBooking && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">
                  Confirm Delete Booking
                </h5>
              </div>

              <div className="modal-body">
                <p>You are about to delete the booking for:</p>
                <ul>
                  <li>
                    <strong>Location:</strong> {selectedBooking.location}
                  </li>
                  <li>
                    <strong>Room:</strong> {selectedBooking.room}
                  </li>
                </ul>
                <p className="text-muted">This action cannot be undone.</p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={confirmDelete}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
