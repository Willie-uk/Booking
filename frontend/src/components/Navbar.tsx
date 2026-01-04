import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { TextAlignStart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import xvg from "../assets/Kwagala Logo.png";
import "../App.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 🔒 Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-dark p-3" style={{ backgroundColor: "#000" }}>
      <div className="container d-flex align-items-center justify-content-between">
        {/* LOGO */}
        <div className="d-flex align-items-center">
          <img
            className="me-3"
            style={{ height: 60, width: 60 }}
            src={xvg}
            alt="logo"
          />
          <Link className="navbar-brand fw-bold fs-3 kwnav" to="/">
            Kwagala Homes
          </Link>
        </div>

        {/* DESKTOP LINKS */}
        <div className="d-none d-sm-flex">
          <Link
            className="text-light me-4"
            style={{ textDecoration: "none" }}
            to="/contact"
          >
            Contact
          </Link>
          <Link
            className="text-light"
            style={{ textDecoration: "none" }}
            to="/about"
          >
            About
          </Link>
        </div>

        {/* MOBILE MENU */}
        <div className="d-sm-none position-relative" ref={menuRef}>
          <button
            className="btn btn-dark border-0"
            onClick={() => setOpen((prev) => !prev)}
            style={{ backgroundColor: "#000" }}
          >
            {open ? <X size={26} /> : <TextAlignStart size={26} />}
          </button>

          {/* ANIMATED DROPDOWN */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="position-absolute end-0 mt-2 rounded shadow"
                style={{
                  minWidth: "150px",
                  zIndex: 1000,
                  backgroundColor: "#000",
                }}
              >
                <Link
                  className="d-block text-light px-3 py-2"
                  style={{ textDecoration: "none" }}
                  to="/contact"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  className="d-block text-light px-3 py-2"
                  style={{ textDecoration: "none" }}
                  to="/about"
                  onClick={() => setOpen(false)}
                >
                  About
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
