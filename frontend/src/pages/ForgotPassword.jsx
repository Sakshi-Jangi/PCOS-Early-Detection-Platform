import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHeartbeat,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";

import { forgotPassword } from "../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const response = await forgotPassword(email);

      setMessage(
        response.message ||
          "Password reset instructions have been sent to your email."
      );

      setEmail("");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Unable to process your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-blue-900/20 p-8">

        {/* Logo */}

        <div className="flex justify-center mb-6">

          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 rounded-full shadow-lg shadow-blue-500/30">

            <FaHeartbeat
              className="text-white"
              size={34}
            />

          </div>

        </div>

        {/* Heading */}

        <h1 className="text-4xl font-bold text-center text-white">
          Forgot Password
        </h1>

        <p className="text-center text-slate-400 mt-3 leading-6">
          Enter your registered email address and we'll send you
          instructions to reset your password.
        </p>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-10"
        >

          <label className="block text-slate-300 font-medium mb-2">
            Email Address
          </label>

          <div className="relative">

            <FaEnvelope
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setMessage("");
              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

          </div>

          {/* Success */}

          {message && (

            <div className="mt-5 rounded-xl border border-green-500/30 bg-green-500/10 p-4">

              <div className="flex items-start gap-3">

                <FaCheckCircle className="text-green-400 mt-1" />

                <p className="text-green-300 text-sm leading-6">
                  {message}
                </p>

              </div>

            </div>

          )}

          {/* Error */}

          {error && (

            <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4">

              <p className="text-red-400 text-sm">
                {error}
              </p>

            </div>

          )}

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-white font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? "Sending Reset Link..."
              : "Send Reset Link"}
          </button>

          {/* Back */}

          <p className="mt-8 text-center text-slate-400">

            Remember your password?{" "}

            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-semibold transition"
            >
              Back to Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default ForgotPassword;