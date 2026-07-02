import { motion } from "framer-motion";
import {
  FaHistory,
  FaHeartbeat,
  FaChartLine,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

export default function RecentActivityCard({ dashboard }) {
  const hasPrediction =
    (dashboard?.total_predictions ?? 0) > 0;

  const predictionColor =
    dashboard?.last_prediction?.includes("Low")
      ? "text-green-400"
      : "text-red-400";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      whileHover={{
        y: -4,
      }}
      className="rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl p-8 shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
          <FaHistory className="text-white text-xl" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Activity
          </h2>

          <p className="text-sm text-slate-400">
            Your latest health information
          </p>
        </div>
      </div>

      {!hasPrediction ? (
        <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center">
          <FaHeartbeat className="mx-auto text-5xl text-blue-500 mb-4" />

          <h3 className="text-xl font-bold text-white">
            No Activity Yet
          </h3>

          <p className="text-slate-400 mt-3">
            Complete your first prediction to see your
            recent health activity here.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Latest Prediction */}
          <div className="flex items-center justify-between rounded-2xl bg-slate-900/60 border border-slate-700 p-5">
            <div className="flex items-center gap-3">
              <FaHeartbeat className="text-blue-400 text-xl" />

              <div>
                <p className="text-slate-400 text-sm">
                  Latest Prediction
                </p>

                <h3
                  className={`text-lg font-bold ${predictionColor}`}
                >
                  {dashboard?.last_prediction || "--"}
                </h3>
              </div>
            </div>
          </div>

          {/* Confidence */}
          <div className="flex items-center justify-between rounded-2xl bg-slate-900/60 border border-slate-700 p-5">
            <div className="flex items-center gap-3">
              <FaChartLine className="text-cyan-400 text-xl" />

              <div>
                <p className="text-slate-400 text-sm">
                  Confidence
                </p>

                <h3 className="text-lg font-bold text-cyan-400">
                  {dashboard?.last_confidence
                    ? `${dashboard.last_confidence}%`
                    : "--"}
                </h3>
              </div>
            </div>
          </div>

          {/* Last Prediction Date */}
          <div className="flex items-center justify-between rounded-2xl bg-slate-900/60 border border-slate-700 p-5">
            <div className="flex items-center gap-3">
              <FaClock className="text-yellow-400 text-xl" />

              <div>
                <p className="text-slate-400 text-sm">
                  Last Prediction Date
                </p>

                <h3 className="text-lg font-bold text-white">
                  {dashboard?.last_prediction_date ||
                    "Not Available"}
                </h3>
              </div>
            </div>
          </div>

          {/* Last Period */}
          <div className="flex items-center justify-between rounded-2xl bg-slate-900/60 border border-slate-700 p-5">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-purple-400 text-xl" />

              <div>
                <p className="text-slate-400 text-sm">
                  Last Period
                </p>

                <h3 className="text-lg font-bold text-white">
                  {dashboard?.last_period?.start_date ||
                    "No period recorded"}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}