import React from "react";
import xvg from "../assets/Kwagala logo.png";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="my-5 container mx-auto text-center">
      <hr style={{ opacity: 0.2 }} />
      <div className="row d-flex justify-content-center">
        <div className="d-flex" style={{ flexDirection: "column" }}>
          <div className="d-flex flex-column flex-sm-row justify-content-evenly align-items-center mt-5">
            <img
              src={xvg}
              alt="logo"
              style={{ width: "100px", height: "100px" }}
            />
            <div
              className="d-none d-sm-flex flex-column"
              style={{ gap: "10px" }}
            >
              <a style={{ textDecoration: "none", color: "gray" }} href="#">
                Partnership
              </a>
              <a style={{ textDecoration: "none", color: "gray" }} href="#">
                Development
              </a>
              <a style={{ textDecoration: "none", color: "gray" }} href="#">
                Growth
              </a>
              <a style={{ textDecoration: "none", color: "gray" }} href="#">
                Updates
              </a>
            </div>
            <Link
              style={{ textDecoration: "none", color: "gray" }}
              to="/contact"
            >
              Contacts
            </Link>
          </div>
          <hr
            className="mx-auto my-3"
            style={{ width: "60%", opacity: ".1" }}
          />
          <div className="d-flex flex-column flex-sm-row text-center justify-content-evenly mb-2">
            <p style={{ color: "lightgray" }}>Kwagala Homes &copy; 2025</p>
            <small style={{ color: "rgb(0,95,135)", opacity: ".3" }}>
              Where Love <span style={{ color: "green" }}>Meets Comfort</span>
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
