
import {
  useEffect,
  useMemo,
  useState,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaHeartbeat,
  FaChartLine,
  FaCalendarAlt,
  FaRobot,
  FaPlusCircle,
  FaUserCircle,
  FaNotesMedical,
  FaHistory,
} from "react-icons/fa";

import { getDashboard } from "../services/dashboardService";

import DashboardStatCard from "../components/DashboardStatCard";
import QuickActionCard from "../components/QuickActionCard";
import HealthTipCard from "../components/HealthTipCard";
import RecentActivityCard from "../components/RecentActivityCard";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboard(data);
      } catch (err) {
        console.error("Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";

    return "Good Evening";
  }, []);

  const today = useMemo(() => {
    return new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  const stats = [
    {
      title: "Total Predictions",
      value: dashboard?.total_predictions ?? 0,
      icon: <FaChartLine />,
      color: "blue",
    },
    {
      title: "Latest Prediction",
      value: dashboard?.last_prediction || "None",
      icon: <FaHeartbeat />,
      color: dashboard?.last_prediction?.includes("Low")
        ? "green"
        : "red",
    },
    {
      title: "Confidence Score",
      value: dashboard?.last_confidence ?? 0,
      icon: <FaRobot />,
      color: "cyan",
      progress: true,
    },
    {
      title: "Next Expected Period",
      value:
        dashboard?.next_expected_period ||
        "Not Available",
      icon: <FaCalendarAlt />,
      color: "purple",
    },
  ];

  const quickActions = [
    {
      title: "New Prediction",
      icon: <FaHeartbeat />,
      route: "/prediction",
      enabled: true,
    },
    {
      title: "Period Tracker",
      icon: <FaNotesMedical />,
      route: "/period",
      enabled: true,
    },
    {
      title: "Profile",
      icon: <FaUserCircle />,
      route: "/profile",
      enabled: true,
    },
    {
      title: "Prediction History",
      icon: <FaHistory />,
      route: "/history",
      enabled: true,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl p-12 text-center shadow-2xl"
        >
          <div className="relative flex justify-center">
            <FaHeartbeat className="text-6xl text-blue-500 animate-pulse" />
            <div className="absolute w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>

          <h2 className="text-white text-2xl font-bold mt-8">
            Loading Dashboard...
          </h2>

          <p className="text-slate-400 mt-2">
            Fetching your latest health insights.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-xl">
              <FaHeartbeat className="text-white text-2xl" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">
                AI Health Dashboard
              </h1>

              <p className="text-slate-400">
                PCOS Early Detection Platform
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-600 px-5 py-3 text-white font-semibold transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
            <div>
              <h2 className="text-4xl font-bold text-white">
                ❤️ {greeting},{" "}
                <span className="text-cyan-400">
                  {dashboard?.name || "User"}
                </span>
              </h2>

              <p className="text-slate-400 mt-3">
                {today}
              </p>

              <p className="text-slate-300 mt-6 max-w-2xl leading-7">
                Welcome back to your AI powered healthcare dashboard.
                Monitor predictions, track your menstrual cycle,
                and stay informed with personalized health insights.
              </p>
            </div>

            <div className="flex items-center">
              <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 shadow-xl">
                <FaHeartbeat className="text-white text-7xl" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Health Overview */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-6">
            Health Overview
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <DashboardStatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
                progress={stat.progress}
              />
            ))}
          </div>
        </div>

        {/* Health Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl p-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Health Summary
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-slate-900/60 border border-slate-700 p-6">
              <p className="text-slate-400">
                Latest Prediction
              </p>

              <h3
                className={`text-2xl font-bold mt-2 ${
                  dashboard?.last_prediction?.includes("Low")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {dashboard?.last_prediction || "None"}
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-900/60 border border-slate-700 p-6">
              <p className="text-slate-400">
                Confidence
              </p>

              <h3 className="text-2xl font-bold text-cyan-400 mt-2">
                {dashboard?.last_confidence ?? 0}%
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-900/60 border border-slate-700 p-6">
              <p className="text-slate-400">
                Prediction Date
              </p>

              <h3 className="text-2xl font-bold text-white mt-2">
                {dashboard?.last_prediction_date || "--"}
              </h3>
            </div>
          </div>
        </motion.div>
                {/* Empty State */}
        {(dashboard?.total_predictions ?? 0) === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 rounded-3xl border border-dashed border-slate-700 bg-slate-900/40 backdrop-blur-xl p-10 text-center"
          >
            <FaHeartbeat className="mx-auto text-6xl text-blue-500 mb-6" />

            <h2 className="text-3xl font-bold text-white">
              No Predictions Yet
            </h2>

            <p className="mt-4 max-w-xl mx-auto text-slate-400">
              Start your first AI assessment to receive personalized
              PCOS risk prediction and health recommendations.
            </p>

            <button
              onClick={() => navigate("/prediction")}
              className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3 font-semibold text-white transition hover:scale-105"
            >
              <FaPlusCircle className="inline mr-2" />
              New Prediction
            </button>
          </motion.div>
        )}

        {/* Bottom Section */}
        <div className="mt-10 grid gap-8 xl:grid-cols-3">
          {/* Left Side */}
          <div className="space-y-8 xl:col-span-2">
            {/* Quick Actions */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-white">
                Quick Actions
              </h2>

              <div className="grid gap-6 sm:grid-cols-2">
                {quickActions.map((action) => (
                  <QuickActionCard
                    key={action.title}
                    title={action.title}
                    icon={action.icon}
                    enabled={action.enabled}
                    onClick={() => {
                      if (action.enabled && action.route) {
                        navigate(action.route);
                      }
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <RecentActivityCard dashboard={dashboard} />
          </div>

          {/* Right Side */}
          <div className="space-y-8">
            <HealthTipCard />
          </div>
        </div>
      </div>
    </div>
  );
}