import { motion } from "framer-motion";

function Hero() {
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

  return (
    <motion.div initial="hidden" animate="show" variants={staggerContainer}>
      <div className="px-4 py-5 text-center">
        <motion.h1 className="display-5 fw-bold" variants={fadeInUp}>
          Where Love Meets Comfort
        </motion.h1>
        <motion.div className="col-lg-6 mx-auto" variants={fadeInUp}>
          <p className="lead mb-4">
            Plan unforgettable trips with homes designed for{" "}
            <span className="fw-bold text-secondary">
              relaxation, work, or exploration.
            </span>{" "}
            Book your stays from trusted hosts and enjoy seamless check-in,
            flexible policies, and 24/7 support.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Hero;
