import { FaHeartbeat } from "react-icons/fa";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl shadow-blue-900/20 p-8">

        {/* Logo */}

        <div className="flex justify-center mb-5">

          <div className="bg-blue-600 p-4 rounded-full shadow-lg shadow-blue-500/30">

            <FaHeartbeat
              className="text-white"
              size={34}
            />

          </div>

        </div>

        {/* Heading */}

        <h1 className="text-4xl font-bold text-center text-white">
          {title}
        </h1>

        <p className="text-center text-slate-400 mt-3">
          {subtitle}
        </p>

        {/* Body */}

        <div className="mt-10">
          {children}
        </div>

      </div>

    </div>
  );
}

export default AuthLayout;