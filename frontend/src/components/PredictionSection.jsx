import React from "react";

export default function PredictionSection({
  title,
  icon,
  children,
}) {
  return (
    <section
      className="
        group
        rounded-3xl
        border
        border-slate-700/60
        bg-white/5
        backdrop-blur-xl
        shadow-2xl
        transition-all
        duration-300
        hover:border-blue-500/40
        hover:shadow-blue-500/10
        hover:-translate-y-1
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-slate-700/50 px-6 py-5">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            text-white
            text-xl
            shadow-lg
            group-hover:scale-105
            transition-transform
            duration-300
          "
        >
          {icon}
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            {title}
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Please provide accurate information.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {children}
      </div>
    </section>
  );
}