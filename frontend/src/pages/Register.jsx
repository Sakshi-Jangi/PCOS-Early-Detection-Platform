import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeartbeat, FaEye, FaEyeSlash } from "react-icons/fa";

import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser({
        name,
        email,
        age: Number(age),
        password,
      });

      setSuccess(response.message || "Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    }catch (err) {
      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
       "Registration failed. Please try again."
     );


    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-8">
    

      {/* Card */}
      <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl shadow-blue-900/20 p-8 my-8">
      

        {/* Logo */}
        <div className="flex justify-center mb-4">
        
          <div className="bg-blue-600 p-4 rounded-full shadow-lg shadow-blue-500/30">
            <FaHeartbeat
              className="text-white"
              size={34}
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-white">
       
          Create Account
        </h1>

        <p className="text-center text-slate-400 mt-3">
          Join PCOS Early Detection
        </p>

        {/* Form */}
        <form
          className="mt-6"
          onSubmit={handleRegister}
        >

          {/* Name */}
          <label className="block text-slate-300 font-medium mb-2">
            Full Name
          </label>

          <input
            type="text"
            required
            placeholder="Enter your full name"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
          />

          {/* Email */}
          <label className="block text-slate-300 font-medium mt-5 mb-2">
            Email
          </label>

          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />

          {/* Age */}
          <label className="block text-slate-300 font-medium mt-5 mb-2">
            Age
          </label>

          <input
            type="number"
            required
            min="10"
            max="80"
            placeholder="Enter your age"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
              setError("");
            }}
          />

          {/* Password */}
          <label className="block text-slate-300 font-medium mt-5 mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Create a password"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 pr-12 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
            >
              {showPassword ? (
                <FaEyeSlash size={20} />
              ) : (
                <FaEye size={20} />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <label className="block text-slate-300 font-medium mt-5 mb-2">
            Confirm Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="Confirm your password"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
          />

          {/* Error */}
          {error && (
            <p className="mt-4 text-sm text-red-400 text-center">
              {error}
            </p>
          )}

          {/* Success */}
          {success && (
            <p className="mt-4 text-sm text-green-400 text-center">
              {success}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-all duration-300 rounded-xl py-3 text-white font-semibold shadow-lg shadow-blue-700/20"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          {/* Login */}
          <p className="text-center text-slate-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-semibold transition"
            >
              Login
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;