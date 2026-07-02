import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import PeriodTracker from "./pages/PeriodTracker";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import PredictionHistory from "./pages/PredictionHistory";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect */}
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Main Pages */}
        <Route
          path="/dashboard"
           element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
        />

        <Route
          path="/prediction"
          
           element={
    <ProtectedRoute>
      <Prediction />
    </ProtectedRoute>
  }
        />

        <Route
          path="/period"
          
           element={
    <ProtectedRoute>
      <PeriodTracker />
    </ProtectedRoute>
  }
        />

        <Route
          path="/profile"
          
           element={
    <ProtectedRoute>
      <Profile/>
    </ProtectedRoute>
  }
        />
        <Route
        path="/history"
        
         element={
    <ProtectedRoute>
      <PredictionHistory />
    </ProtectedRoute>
  }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;