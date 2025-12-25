import React from "react";
import { motion } from "framer-motion";

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

const About: React.FC = () => {
  return (
    <motion.div
      className="px-5 my-5"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      {/* TITLE */}
      <motion.h1 className="fw-bold my-4" variants={fadeInUp}>
        About Kwagala Homes
      </motion.h1>

      {/* INTRO */}
      <motion.p variants={fadeInUp} style={{ color: "grey" }}>
        <strong>Kwagala</strong> is a word derived from the Ugandan language
        <strong> Luganda</strong>, meaning <strong>love</strong>. This meaning
        defines who we are and how we serve our guests.
      </motion.p>

      <motion.p variants={fadeInUp} className="fw-semibold">
        Our slogan — <em>“Where Love Meets Comfort”</em> — reflects our promise
        to provide; welcoming, peaceful, and well-prepared homes for every stay.
      </motion.p>

      {/* CARDS */}
      <motion.div className="d-flex gap-2 flex-column my-4" variants={fadeInUp}>
        <div className="d-flex gap-2">
          <motion.div
            className="card col-md-6"
            style={{ borderRadius: "25px" }}
            variants={fadeInUp}
          >
            <div className="card-body">
              <h5 className="fw-bold">Our Mission</h5>
              <p style={{ color: "grey" }}>
                To offer affordable, secure, and comfortable homes while
                creating memorable experiences rooted in care and hospitality.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="card col-md-6"
            style={{ borderRadius: "25px" }}
            variants={fadeInUp}
          >
            <div className="card-body">
              <h5 className="fw-bold">Our Vision</h5>
              <p style={{ color: "grey" }}>
                To become a trusted name in short-stay and serviced apartments
                across Kenya and beyond.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="d-flex gap-2">
          <motion.div
            className="card col-md-6"
            style={{ borderRadius: "25px" }}
            variants={fadeInUp}
          >
            <div className="card-body">
              <h5 className="fw-bold">What We Offer</h5>
              <p style={{ color: "grey" }}>
                Fully furnished homes, flexible booking options, transparent
                pricing, and responsive customer support.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="card col-md-6"
            style={{ borderRadius: "25px" }}
            variants={fadeInUp}
          >
            <div className="card-body">
              <h5 className="fw-bold">Our Community</h5>
              <p style={{ color: "grey" }}>
                We work closely with hosts, partners, and guests to grow a
                reliable and respectful hosting ecosystem.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* FOOT NOTE */}
      <motion.div className="my-5" variants={fadeInUp}>
        <p>
          At Kwagala Homes, every guest matters. Whether for a night, a week, or
          longer — you are always welcome.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default About;
