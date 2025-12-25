import { Link } from "react-router-dom";
import xvg from "../assets/Kwagala Logo.png";
import "../App.css";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark p-3"
      style={{ backgroundColor: "#000" }}
    >
      <div className="container d-flex align-items-center">
        <div className="d-flex align-items-center">
          <img
            className="me-3"
            style={{ height: 60, width: 60 }}
            src={xvg}
            alt="logo"
          />
          <Link className="navbar-brand fw-bold fs-3" to="/">
            Kwagala Homes
          </Link>
        </div>

        <div>
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
      </div>
    </nav>
  );
}
