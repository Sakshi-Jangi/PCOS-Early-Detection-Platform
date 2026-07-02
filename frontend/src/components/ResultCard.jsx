import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaHeartbeat,
  FaChartLine,
  FaArrowRight,
  FaRedo,
  FaCalendarAlt,
} from "react-icons/fa";

export default function ResultCard({
  result,
  profile,
  onDashboard,
  onReset,
  onDownload,
}) {
  const lowRisk = result.prediction.includes("Low");

  const recommendations = lowRisk
    ? [
        "Maintain a balanced diet.",
        "Exercise regularly.",
        "Sleep 7–8 hours every night.",
        "Continue tracking your menstrual cycle.",
      ]
    : [
        "Consult a gynecologist.",
        "Exercise regularly.",
        "Maintain a healthy diet.",
        "Track your menstrual cycle.",
        "Reduce processed foods.",
      ];

  const predictionDate = new Date().toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="space-y-8"
    >
      {/* Main Result Card */}
      <div
        className={`rounded-3xl border backdrop-blur-xl p-8 shadow-2xl ${
          lowRisk
            ? "border-green-500/40 bg-green-500/10"
            : "border-red-500/40 bg-red-500/10"
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Left Side */}
          <div className="flex items-start gap-5">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg ${
                lowRisk
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {lowRisk ? (
                <FaCheckCircle />
              ) : (
                <FaExclamationTriangle />
              )}
            </div>

            <div>
              <p className="uppercase tracking-[0.25em] text-sm text-slate-400">
                Prediction Result
              </p>

              <h2
                className={`mt-2 text-4xl font-bold ${
                  lowRisk
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {result.prediction}
              </h2>

              <div
                className={`mt-4 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                  lowRisk
                    ? "bg-green-500/20 text-green-300"
                    : "bg-red-500/20 text-red-300"
                }`}
              >
                {lowRisk ? "LOW RISK" : "HIGH RISK"}
              </div>

              <div className="mt-6 flex items-center gap-2 text-slate-400">
                <FaCalendarAlt />

                <span>
                  Predicted on: {predictionDate}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:w-80">
            <div className="mb-3 flex items-center gap-2 text-slate-300">
              <FaChartLine />
              Confidence Score
            </div>

            <h2
              className={`mb-5 text-5xl font-bold ${
                lowRisk
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {result.confidence}%
            </h2>

            <div className="h-4 w-full overflow-hidden rounded-full bg-slate-700">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${result.confidence}%`,
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
                className={`h-full rounded-full ${
                  lowRisk
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />
            </div>

            <p className="mt-4 text-sm text-slate-400 leading-6">
              This confidence score represents how certain the AI model is
              about its prediction based on the information you provided.
            </p>
          </div>
        </div>
      </div>
            {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl p-8 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
            <FaHeartbeat className="text-white text-xl" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white">
              Health Recommendations
            </h3>
            <p className="text-slate-400 text-sm">
              Personalized suggestions based on your prediction.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {recommendations.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.25 + index * 0.08,
              }}
              className="flex items-start gap-3 rounded-2xl border border-slate-700 bg-slate-900/60 p-4 transition hover:border-blue-500/40 hover:bg-slate-900"
            >
              <FaCheckCircle className="mt-1 text-green-400 shrink-0" />

              <span className="text-slate-300 leading-6">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="flex flex-col gap-4 md:flex-row"
      >
        <button
          type="button"
          onClick={onDashboard}
          className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/30"
        >
          <FaArrowRight />
          View Dashboard
        </button>

        <button
          type="button"
          onClick={onReset}
          className="flex flex-1 items-center justify-center gap-3 rounded-2xl border border-slate-600 bg-slate-900/60 px-6 py-4 font-semibold text-white transition-all duration-300 hover:border-blue-500 hover:bg-slate-800"
        >
          <FaRedo />
          Predict Again
        </button>
        <button
  type="button"
  onClick={onDownload}
  className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
>
  <FaDownload />
  Download Health Report
</button>
      </motion.div>

      {/* Success Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="rounded-2xl border border-green-500/30 bg-green-500/10 px-6 py-4"
      >
        <div className="flex items-center gap-3">
          <FaCheckCircle className="text-green-400 text-xl" />

          <div>
            <p className="font-semibold text-green-300">
              Prediction completed successfully
            </p>

            <p className="text-sm text-slate-300">
              Your assessment has been generated. You can review your dashboard
              for additional insights or run another prediction at any time.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}