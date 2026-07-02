import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaCalendarAlt,
  FaExclamationTriangle,
  FaSyncAlt,
} from "react-icons/fa";

import {
  getPeriods,
  addPeriod,
} from "../services/periodService";

import PeriodHeader from "../components/PeriodHeader";
import CycleSummary from "../components/CycleSummary";
import AddPeriodCard from "../components/AddPeriodCard";
import PeriodHistory from "../components/PeriodHistory";

export default function PeriodTracker() {
  const navigate = useNavigate();

  const [periods, setPeriods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const fetchPeriods = async () => {
    try {
      setLoading(true);
      setError(false);

      const data = await getPeriods();

      const sorted = [...data].sort(
        (a, b) =>
          new Date(b.start_date) -
          new Date(a.start_date)
      );

      setPeriods(sorted);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeriods();
  }, []);

  const handleAddPeriod = async (periodData) => {
    try {
      setSaving(true);

      await addPeriod(periodData);

      alert("Period added successfully.");

      await fetchPeriods();
    } catch (err) {
      alert(
        err.response?.data?.detail ||
          "Unable to save period."
      );
    } finally {
      setSaving(false);
    }
  };

  const cycleSummary = useMemo(() => {
    if (periods.length === 0) {
      return {
        lastPeriod: "No records",
        cycleLength: "--",
        periodDuration: "--",
        nextExpected: "--",
      };
    }

    const latest = periods[0];

    const duration =
      Math.floor(
        (new Date(latest.end_date) -
          new Date(latest.start_date)) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    let cycleLength = "--";
    let nextExpected = "--";

    if (periods.length >= 2) {
      const latestStart = new Date(
        periods[0].start_date
      );

      const previousStart = new Date(
        periods[1].start_date
      );

      const diff =
        Math.round(
          (latestStart - previousStart) /
            (1000 * 60 * 60 * 24)
        );

      cycleLength = diff;

      const next = new Date(latestStart);
      next.setDate(next.getDate() + diff);

      nextExpected = next.toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      );
    }

    return {
      lastPeriod: new Date(
        latest.start_date
      ).toLocaleDateString("en-IN"),

      cycleLength,

      periodDuration: `${duration} days`,

      nextExpected,
    };
  }, [periods]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">

        <motion.div
          initial={{ opacity: 0, scale: .9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl p-12 text-center shadow-2xl"
        >
          <div className="relative flex justify-center">

            <FaCalendarAlt className="text-6xl text-cyan-400 animate-pulse" />

            <div className="absolute w-20 h-20 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin" />

          </div>

          <h2 className="mt-8 text-2xl font-bold text-white">
            Loading Period Tracker...
          </h2>

          <p className="mt-3 text-slate-400">
            Fetching your menstrual history.
          </p>

        </motion.div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-3xl border border-red-500/30 bg-red-500/10 backdrop-blur-xl p-10 max-w-lg w-full text-center"
        >

          <FaExclamationTriangle className="mx-auto text-6xl text-red-400 mb-6" />

          <h2 className="text-3xl font-bold text-white">
            Unable to load period history
          </h2>

          <button
            onClick={fetchPeriods}
            className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3 text-white font-semibold hover:scale-105 transition"
          >
            Retry
          </button>

        </motion.div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

      <PeriodHeader
        onBack={() => navigate("/dashboard")}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl p-8 shadow-xl"
        >

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-4xl font-bold text-white">
                Track Your Cycle
              </h2>

              <p className="mt-5 max-w-2xl text-slate-300 leading-7">
                Recording your menstrual cycle regularly helps
                improve prediction accuracy and identify
                irregularities early.
              </p>

            </div>

            <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 shadow-xl">

              <FaCalendarAlt className="text-7xl text-white" />

            </div>

          </div>

        </motion.div>
                {/* Cycle Summary */}
        <div className="mt-10">
          <CycleSummary summary={cycleSummary} />
        </div>

        {/* Bottom Section */}
        <div className="grid xl:grid-cols-2 gap-8 mt-10">

          {/* Add Period */}
          <AddPeriodCard
            loading={saving}
            onSave={handleAddPeriod}
          />

          {/* Period History */}
          <PeriodHistory periods={periods} />

        </div>

        {/* Empty State */}
        {periods.length === 0 && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="mt-10 rounded-3xl border border-dashed border-slate-700 bg-slate-900/40 backdrop-blur-xl p-12 text-center"
          >
            <FaCalendarAlt className="mx-auto text-6xl text-cyan-400 mb-6" />

            <h2 className="text-3xl font-bold text-white">
              No Period History Available
            </h2>

            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              Start tracking today by adding your first menstrual cycle.
              Your cycle insights will automatically appear here.
            </p>
          </motion.div>
        )}

        {/* Bottom Buttons */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="mt-10 flex flex-col md:flex-row gap-4"
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="
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
            "
          >
            Dashboard
          </button>

          <button
            onClick={fetchPeriods}
            disabled={loading}
            className="
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
            <FaSyncAlt
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </motion.div>

      </div>
    </div>
  );
}