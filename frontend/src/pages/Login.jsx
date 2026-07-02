
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeartbeat, FaEye, FaEyeSlash } from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
  if (isAuthenticated) {
    navigate("/dashboard", { replace: true });
  }
}, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser(email, password);

      if (response.access_token) {
        login(response.access_token);
        navigate("/dashboard");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl shadow-blue-900/20 p-8">
        
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="bg-blue-600 p-4 rounded-full shadow-lg shadow-blue-500/30">
            <FaHeartbeat className="text-white" size={34} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-white">
          PCOS Early Detection
        </h1>

        <p className="text-center text-slate-400 mt-3">
          AI-powered Health Risk Assessment
        </p>

        {/* Form */}
        <form className="mt-10" onSubmit={handleLogin}>
          
          {/* Email */}
          <label className="block text-slate-300 font-medium mb-2">
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

          {/* Password */}
          <label className="block text-slate-300 font-medium mt-6 mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter your password"
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

          {/* Forgot Password */}
          <div className="flex justify-end mt-2">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-400 hover:text-blue-300 transition"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <p className="mt-3 text-sm text-red-400 text-center">
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-all duration-300 rounded-xl py-3 text-white font-semibold shadow-lg shadow-blue-700/20"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register */}
          <p className="text-center text-slate-400 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-300 font-semibold transition"
            >
              Register
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;