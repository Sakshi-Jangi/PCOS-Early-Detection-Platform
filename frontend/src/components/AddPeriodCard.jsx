import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarPlus,
  FaSave,
  FaTrashAlt,
} from "react-icons/fa";

export default function AddPeriodCard({
  onSave,
  loading,
}) {
  const initialState = {
    start_date: "",
    end_date: "",
  };

  const [formData, setFormData] =
    useState(initialState);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearForm = () => {
    setFormData(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.start_date || !formData.end_date) {
      alert("Please select both dates.");
      return;
    }

    if (
      new Date(formData.end_date) <
      new Date(formData.start_date)
    ) {
      alert(
        "End Date cannot be before Start Date."
      );
      return;
    }

    await onSave(formData);

    clearForm();
  };

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

          <FaCalendarPlus className="text-white text-2xl" />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            Add Period
          </h2>

          <p className="text-slate-400">
            Record your latest menstrual cycle.
          </p>

        </div>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Start Date */}
        <div>

          <label className="block mb-2 text-slate-300 font-medium">
            Start Date
          </label>

          <input
            type="date"
            value={formData.start_date}
            onChange={(e) =>
              updateField(
                "start_date",
                e.target.value
              )
            }
            required
            className="
              w-full
              rounded-2xl
              border
              border-slate-700
              bg-slate-900/60
              px-4
              py-3
              text-white
              outline-none
              focus:border-cyan-500
              focus:ring-2
              focus:ring-cyan-500/30
              transition
            "
          />

        </div>

        {/* End Date */}
        <div>

          <label className="block mb-2 text-slate-300 font-medium">
            End Date
          </label>

          <input
            type="date"
            value={formData.end_date}
            min={formData.start_date}
            onChange={(e) =>
              updateField(
                "end_date",
                e.target.value
              )
            }
            required
            className="
              w-full
              rounded-2xl
              border
              border-slate-700
              bg-slate-900/60
              px-4
              py-3
              text-white
              outline-none
              focus:border-cyan-500
              focus:ring-2
              focus:ring-cyan-500/30
              transition
            "
          />

        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">

          <button
            type="submit"
            disabled={loading}
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              px-6
              py-4
              text-white
              font-semibold
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:shadow-blue-500/30
              disabled:opacity-70
              disabled:cursor-not-allowed
            "
          >
            <FaSave />

            {loading
              ? "Saving..."
              : "Save Period"}
          </button>

          <button
            type="button"
            onClick={clearForm}
            disabled={loading}
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              border-slate-700
              bg-slate-900/60
              px-6
              py-4
              text-white
              font-semibold
              transition-all
              duration-300
              hover:border-cyan-500
              hover:bg-slate-800
              disabled:opacity-70
            "
          >
            <FaTrashAlt />
            Clear
          </button>

        </div>

      </form>
    </motion.div>
  );
}