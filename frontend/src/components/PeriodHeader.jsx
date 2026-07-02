import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaArrowLeft,
} from "react-icons/fa";

export default function PeriodHeader({ onBack }) {
  return (
    <div className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">

          <motion.div
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-xl"
          >
            <FaCalendarAlt className="text-white text-2xl" />
          </motion.div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              Period Tracker
            </h1>

            <p className="text-slate-400">
              Track your menstrual cycle and monitor your reproductive health.
            </p>
          </div>

        </div>

        {/* Right */}
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={onBack}
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-slate-700
            bg-slate-900/60
            px-5
            py-3
            text-white
            font-semibold
            transition-all
            duration-300
            hover:border-cyan-500
            hover:bg-slate-800
          "
        >
          <FaArrowLeft />
          Dashboard
        </motion.button>

      </div>
    </div>
  );
}