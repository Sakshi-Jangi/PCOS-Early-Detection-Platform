import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";

export default function QuickActionCard({
  title,
  icon,
  onClick,
  enabled = true,
}) {
  return (
    <motion.button
      type="button"
      whileHover={
        enabled
          ? {
              y: -6,
              scale: 1.02,
            }
          : {}
      }
      whileTap={
        enabled
          ? {
              scale: 0.98,
            }
          : {}
      }
      transition={{
        duration: 0.25,
      }}
      disabled={!enabled}
      onClick={enabled ? onClick : undefined}
      className={`
        group
        w-full
        rounded-3xl
        border
        backdrop-blur-xl
        p-6
        text-left
        transition-all
        duration-300
        ${
          enabled
            ? "border-slate-700 bg-white/5 hover:border-blue-500/40 hover:bg-slate-900/70 cursor-pointer"
            : "border-slate-800 bg-slate-900/40 opacity-70 cursor-not-allowed"
        }
      `}
    >
      <div className="flex items-start justify-between">
        {/* Left */}
        <div>
          <div
            className={`
              w-14
              h-14
              rounded-2xl
              flex
              items-center
              justify-center
              text-2xl
              text-white
              shadow-lg
              transition-transform
              duration-300
              ${
                enabled
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:scale-110"
                  : "bg-slate-700"
              }
            `}
          >
            {icon}
          </div>

          <h3 className="mt-5 text-xl font-bold text-white">
            {title}
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            {enabled
              ? "Open this feature"
              : "Coming Soon"}
          </p>
        </div>

        {/* Status */}
        {!enabled ? (
          <div className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
            <FaLock className="text-xs" />
            Coming Soon
          </div>
        ) : (
          <div className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
            Available
          </div>
        )}
      </div>

      {enabled && (
        <div className="mt-6 flex items-center text-sm font-medium text-cyan-400 transition-all group-hover:translate-x-1">
          Open →
        </div>
      )}
    </motion.button>
  );
}