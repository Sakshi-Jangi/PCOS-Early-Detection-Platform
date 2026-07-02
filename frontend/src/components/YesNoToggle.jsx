import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function YesNoToggle({ value, onChange }) {
  return (
    <div className="flex w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/60 backdrop-blur-md">
      {/* YES Button */}
      <button
        type="button"
        onClick={() => onChange(1)}
        className={`
          flex-1
          flex
          items-center
          justify-center
          gap-2
          px-4
          py-3
          text-sm
          font-semibold
          transition-all
          duration-300
          ${
            value === 1
              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg scale-[1.02]"
              : "bg-transparent text-slate-400 hover:bg-slate-800 hover:text-white"
          }
        `}
      >
        <FaCheck />
        YES
      </button>

      {/* Divider */}
      <div className="w-px bg-slate-700" />

      {/* NO Button */}
      <button
        type="button"
        onClick={() => onChange(0)}
        className={`
          flex-1
          flex
          items-center
          justify-center
          gap-2
          px-4
          py-3
          text-sm
          font-semibold
          transition-all
          duration-300
          ${
            value === 0
              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg scale-[1.02]"
              : "bg-transparent text-slate-400 hover:bg-slate-800 hover:text-white"
          }
        `}
      >
        <FaTimes />
        NO
      </button>
    </div>
  );
}