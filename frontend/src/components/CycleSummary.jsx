import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaSyncAlt,
  FaHeartbeat,
  FaMagic,
} from "react-icons/fa";

const cards = [
  {
    key: "lastPeriod",
    title: "Last Period",
    icon: <FaCalendarAlt />,
    color: "from-blue-600 to-cyan-500",
  },
  {
    key: "cycleLength",
    title: "Cycle Length",
    icon: <FaSyncAlt />,
    color: "from-cyan-500 to-blue-500",
  },
  {
    key: "periodDuration",
    title: "Period Duration",
    icon: <FaHeartbeat />,
    color: "from-pink-500 to-rose-500",
  },
  {
    key: "nextExpected",
    title: "Next Expected",
    icon: <FaMagic />,
    color: "from-indigo-500 to-blue-500",
  },
];

export default function CycleSummary({ summary }) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-white">
        Cycle Summary
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.key}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            className="
              rounded-3xl
              border
              border-slate-700
              bg-white/5
              backdrop-blur-xl
              p-6
              shadow-xl
              hover:border-cyan-500/40
              transition-all
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h3 className="mt-4 text-2xl font-bold text-white break-words">
                  {summary[card.key]}
                </h3>
              </div>

              <div
                className={`
                  w-14
                  h-14
                  rounded-2xl
                  bg-gradient-to-r
                  ${card.color}
                  flex
                  items-center
                  justify-center
                  text-white
                  text-2xl
                  shadow-lg
                `}
              >
                {card.icon}
              </div>
            </div>

            <div className="mt-6 h-1 overflow-hidden rounded-full bg-slate-700">
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: "100%",
                }}
                transition={{
                  duration: 0.8,
                }}
                className={`h-full bg-gradient-to-r ${card.color}`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}