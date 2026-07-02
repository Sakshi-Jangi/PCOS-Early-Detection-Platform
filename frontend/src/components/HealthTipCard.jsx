import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeartbeat,
  FaTint,
  FaWalking,
  FaMoon,
  FaCalendarCheck,
  FaAppleAlt,
} from "react-icons/fa";

const tips = [
  {
    icon: <FaTint />,
    title: "Stay Hydrated",
    tip: "Drink at least 2–3 liters of water daily to support hormonal balance.",
  },
  {
    icon: <FaWalking />,
    title: "Stay Active",
    tip: "Aim for at least 30 minutes of moderate exercise every day.",
  },
  {
    icon: <FaMoon />,
    title: "Quality Sleep",
    tip: "Getting 7–8 hours of sleep helps regulate hormones and reduces stress.",
  },
  {
    icon: <FaCalendarCheck />,
    title: "Track Your Cycle",
    tip: "Recording your menstrual cycle regularly helps identify changes early.",
  },
  {
    icon: <FaAppleAlt />,
    title: "Healthy Nutrition",
    tip: "Reduce processed foods and include more fruits, vegetables, and whole grains.",
  },
];

export default function HealthTipCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % tips.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const currentTip = tips[index];

  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl p-6 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
          <FaHeartbeat className="text-white text-xl" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Daily Health Tip
          </h2>

          <p className="text-sm text-slate-400">
            Personalized wellness reminder
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -15,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl shadow-lg mb-5">
            {currentTip.icon}
          </div>

          <h3 className="text-2xl font-bold text-white mb-3">
            {currentTip.title}
          </h3>

          <p className="text-slate-300 leading-7">
            {currentTip.tip}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-2 mt-8">
        {tips.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index
                ? "w-8 bg-cyan-400"
                : "w-2 bg-slate-600"
            }`}
          />
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
        <p className="text-sm text-cyan-300">
          💙 Small healthy habits every day can make a significant difference over time.
        </p>
      </div>
    </motion.div>
  );
}