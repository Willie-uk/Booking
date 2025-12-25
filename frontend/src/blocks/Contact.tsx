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

const Contact: React.FC = () => {
  return (
    <motion.div
      className="px-5 my-5"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <motion.h1 className="fw-bold my-4" variants={fadeInUp}>
        Kwagala Homes Contact Page
      </motion.h1>
      <motion.p variants={fadeInUp}>
        Feel free to contact us at any time.
      </motion.p>

      <motion.div className="d-flex gap-2 flex-column" variants={fadeInUp}>
        <div className="d-flex gap-2">
          <motion.div
            className="card col-md-6"
            style={{ borderRadius: "25px" }}
            variants={fadeInUp}
          >
            <div className="card-body">
              <h5 className="card-title text-start fw-bold">Email:</h5>
              <p className="card-text" style={{ color: "grey" }}>
                For general inquiries and information, email us at{" "}
                <a
                  href="mailto:kwagalahomes@gmail.com"
                  style={{ textDecoration: "none" }}
                >
                  kwagalahomes@gmail.com
                </a>
              </p>
            </div>
          </motion.div>

          <motion.div
            className="card col-md-6"
            style={{ borderRadius: "25px" }}
            variants={fadeInUp}
          >
            <div className="card-body">
              <h5 className="card-title text-start fw-bold">Phone:</h5>
              <p className="card-text" style={{ color: "grey" }}>
                Reach us for any inquiry or assistance at{" "}
                <span className="text-primary">+254790074065</span> or
                <span className="text-primary">+254791354093</span>
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
              <h5 className="card-title text-start fw-bold">Visit Us:</h5>
              <p className="card-text" style={{ color: "grey" }}>
                Current location will be updated once upgrade is complete.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="card col-md-6"
            style={{ borderRadius: "25px" }}
            variants={fadeInUp}
          >
            <div className="card-body">
              <h5 className="card-title text-start fw-bold">Our community:</h5>
              <p className="card-text" style={{ color: "grey" }}>
                Join the fastest growing community in hosting field, any of the
                the listed companies are welcome for patnership.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="my-5" variants={fadeInUp}>
        <p>
          Feel free to drop your ratings or suggestions about our services in
          the feedback form provided on the main page.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
