import { motion } from "framer-motion";

const colors = {
  blue: {
    bg: "from-blue-600 to-cyan-500",
    text: "text-blue-400",
    ring: "#3B82F6",
  },

  cyan: {
    bg: "from-cyan-500 to-blue-500",
    text: "text-cyan-400",
    ring: "#06B6D4",
  },

  green: {
    bg: "from-green-500 to-emerald-500",
    text: "text-green-400",
    ring: "#22C55E",
  },

  red: {
    bg: "from-red-500 to-rose-500",
    text: "text-red-400",
    ring: "#EF4444",
  },

  purple: {
    bg: "from-purple-500 to-fuchsia-500",
    text: "text-purple-400",
    ring: "#A855F7",
  },
};

export default function DashboardStatCard({
  title,
  value,
  icon,
  color = "blue",
  progress = false,
}) {
  const current = colors[color] || colors.blue;

  const percentage =
    progress && typeof value === "number"
      ? Math.min(Math.max(value, 0), 100)
      : 0;

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        rounded-3xl
        border
        border-slate-700
        bg-white/5
        backdrop-blur-xl
        p-6
        shadow-xl
        hover:border-blue-500/40
        transition-all
      "
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>

          {!progress ? (

            <h2
              className={`mt-4 text-3xl font-bold ${current.text}`}
            >
              {value}
            </h2>

          ) : (

            <div className="mt-4 relative w-28 h-28">

              <svg
                className="-rotate-90"
                width="112"
                height="112"
              >
                <circle
                  cx="56"
                  cy="56"
                  r={radius}
                  stroke="#334155"
                  strokeWidth="8"
                  fill="transparent"
                />

                <motion.circle
                  cx="56"
                  cy="56"
                  r={radius}
                  stroke={current.ring}
                  strokeWidth="8"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{
                    strokeDashoffset: circumference,
                  }}
                  animate={{
                    strokeDashoffset: offset,
                  }}
                  transition={{
                    duration: 1,
                  }}
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">

                <span
                  className={`text-2xl font-bold ${current.text}`}
                >
                  {percentage}%
                </span>

              </div>

            </div>

          )}

        </div>

        <div
          className={`
            w-14
            h-14
            rounded-2xl
            bg-gradient-to-r
            ${current.bg}
            flex
            items-center
            justify-center
            text-white
            text-2xl
            shadow-lg
          `}
        >
          {icon}
        </div>

      </div>
    </motion.div>
  );
}