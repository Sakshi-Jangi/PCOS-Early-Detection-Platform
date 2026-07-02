import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaUserCircle,
  FaArrowLeft,
  FaSyncAlt,
  FaExclamationTriangle,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

import {
  getProfile,
  updateProfile,
} from "../services/profileService";

import ProfileHeader from "../components/ProfileHeader";
import ProfileInfoCard from "../components/ProfileInfoCard";

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    age: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(false);

      const data = await getProfile();

      setProfile(data);

      setForm({
        name: data.name,
        age: data.age,
      });
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);

      const updated = await updateProfile({
        name: form.name,
        age: Number(form.age),
      });

      setProfile(updated);

      setForm({
        name: updated.name,
        age: updated.age,
      });

      setEditing(false);

      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const initials = useMemo(() => {
    if (!profile?.name) return "U";

    return profile.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }, [profile]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: .9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl p-12 text-center shadow-2xl"
        >
          <div className="relative flex justify-center">
            <FaUserCircle className="text-6xl text-cyan-400 animate-pulse" />

            <div className="absolute w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          </div>

          <h2 className="mt-8 text-2xl font-bold text-white">
            Loading Profile...
          </h2>

          <p className="mt-3 text-slate-400">
            Fetching your account information.
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
          className="rounded-3xl border border-red-500/30 bg-red-500/10 backdrop-blur-xl p-10 text-center max-w-lg w-full"
        >
          <FaExclamationTriangle className="mx-auto text-6xl text-red-400 mb-6" />

          <h2 className="text-3xl font-bold text-white">
            Unable to load profile
          </h2>

          <p className="mt-4 text-slate-300">
            Something went wrong while fetching your profile.
          </p>

          <button
            onClick={fetchProfile}
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

      <ProfileHeader
        onBack={() => navigate("/dashboard")}
      />

      <div className="max-w-6xl mx-auto px-6 py-10">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl p-8 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div className="flex items-center gap-6">

              <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                {initials}
              </div>

              <div>

                <p className="uppercase tracking-widest text-sm text-slate-400">
                  Welcome Back
                </p>

                <h2 className="mt-2 text-4xl font-bold text-white">
                  {profile.name}
                </h2>

                <p className="mt-4 max-w-xl leading-7 text-slate-300">
                  Manage your account information and keep your healthcare
                  profile up to date.
                </p>

              </div>

            </div>
                        <div className="flex flex-col gap-3 w-full lg:w-auto">

              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 text-white font-semibold transition hover:scale-105"
                >
                  <FaEdit />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-4 text-white font-semibold transition hover:scale-105 disabled:opacity-70"
                  >
                    <FaSave />
                    {saving ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    onClick={() => {
                      setEditing(false);

                      setForm({
                        name: profile.name,
                        age: profile.age,
                      });
                    }}
                    className="flex items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-4 text-white font-semibold transition hover:border-red-500 hover:bg-slate-800"
                  >
                    <FaTimes />
                    Cancel
                  </button>
                </>
              )}

              <button
                onClick={fetchProfile}
                className="flex items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-4 text-white font-semibold transition hover:border-cyan-500 hover:bg-slate-800"
              >
                <FaSyncAlt />
                Refresh Profile
              </button>

            </div>

          </div>

        </motion.div>

        {/* Account Information */}

        <div className="mt-10">

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-2xl font-bold text-white"
          >
            Account Information
          </motion.h2>

          {!editing ? (
            <div className="grid gap-6 md:grid-cols-2">

              <ProfileInfoCard
                title="User ID"
                value={profile.id}
                icon="id"
              />

              <ProfileInfoCard
                title="Full Name"
                value={profile.name}
                icon="user"
              />

              <ProfileInfoCard
                title="Email Address"
                value={profile.email}
                icon="email"
              />

              <ProfileInfoCard
                title="Age"
                value={`${profile.age} Years`}
                icon="age"
              />

            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl p-8"
            >
              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <label className="block mb-2 text-slate-300">
                    Full Name
                  </label>

                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-slate-300">
                    Age
                  </label>

                  <input
                    type="number"
                    min={12}
                    max={60}
                    value={form.age}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        age: e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2 text-slate-300">
                    Email Address
                  </label>

                  <input
                    value={profile.email}
                    disabled
                    className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-400"
                  />
                </div>

              </div>

            </motion.div>
          )}

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10"
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-4 text-white font-semibold transition hover:border-cyan-500 hover:bg-slate-800"
          >
            <FaArrowLeft />
            Back to Dashboard
          </button>
        </motion.div>

      </div>

    </div>
  );
}