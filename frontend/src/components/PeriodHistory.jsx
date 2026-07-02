import { motion } from "framer-motion";
import {
  FaHistory,
  FaCalendarAlt,
  FaRegCalendarCheck,
  FaHeartbeat,
} from "react-icons/fa";

export default function PeriodHistory({ periods }) {
  if (!periods || periods.length === 0) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          rounded-3xl
          border
          border-slate-700
          bg-white/5
          backdrop-blur-xl
          p-10
          shadow-xl
          h-full
          flex
          flex-col
          justify-center
          items-center
          text-center
        "
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-xl">
          <FaHistory className="text-white text-4xl" />
        </div>

        <h2 className="mt-8 text-3xl font-bold text-white">
          No Period Records Yet
        </h2>

        <p className="mt-4 max-w-md text-slate-400 leading-7">
          Start tracking today. Once you add your first menstrual
          cycle, your history will appear here automatically.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -4,
      }}
      className="
        rounded-3xl
        border
        border-slate-700
        bg-white/5
        backdrop-blur-xl
        p-8
        shadow-xl
      "
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
          <FaHistory className="text-white text-2xl" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Period History
          </h2>

          <p className="text-slate-400">
            Your previously recorded menstrual cycles.
          </p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-left">
              <th className="py-4 text-slate-300 font-semibold">
                Start Date
              </th>

              <th className="py-4 text-slate-300 font-semibold">
                End Date
              </th>

              <th className="py-4 text-slate-300 font-semibold">
                Duration
              </th>
            </tr>
          </thead>

          <tbody>
            {periods.map((period, index) => {
              const duration =
                Math.floor(
                  (new Date(period.end_date) -
                    new Date(period.start_date)) /
                    (1000 * 60 * 60 * 24)
                ) + 1;

              return (
                <motion.tr
                  key={period.id || index}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.06,
                  }}
                  className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                >
                  <td className="py-5">
                    <div className="flex items-center gap-2 text-slate-300">
                      <FaCalendarAlt className="text-cyan-400" />
                      {new Date(
                        period.start_date
                      ).toLocaleDateString("en-IN")}
                    </div>
                  </td>

                  <td className="py-5">
                    <div className="flex items-center gap-2 text-slate-300">
                      <FaRegCalendarCheck className="text-cyan-400" />
                      {new Date(
                        period.end_date
                      ).toLocaleDateString("en-IN")}
                    </div>
                  </td>

                  <td className="py-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-pink-500/10 border border-pink-500/20 px-4 py-2">
                      <FaHeartbeat className="text-pink-400" />

                      <span className="font-semibold text-pink-300">
                        {duration} Days
                      </span>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 lg:hidden">
        {periods.map((period, index) => {
          const duration =
            Math.floor(
              (new Date(period.end_date) -
                new Date(period.start_date)) /
                (1000 * 60 * 60 * 24)
            ) + 1;

          return (
            <motion.div
              key={period.id || index}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5"
            >
              <div className="space-y-4">

                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Start
                  </span>

                  <span className="text-white font-semibold">
                    {new Date(
                      period.start_date
                    ).toLocaleDateString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">
                    End
                  </span>

                  <span className="text-white font-semibold">
                    {new Date(
                      period.end_date
                    ).toLocaleDateString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Duration
                  </span>

                  <span className="text-pink-400 font-bold">
                    {duration} Days
                  </span>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}