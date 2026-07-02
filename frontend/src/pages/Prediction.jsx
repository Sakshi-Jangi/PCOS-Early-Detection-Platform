import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaHeartbeat,
  FaVenus,
  FaUserMd,
  FaLeaf,
  FaRunning,
} from "react-icons/fa";

import { predictPCOS } from "../services/predictionService";
import PredictionSection from "../components/PredictionSection";
import YesNoToggle from "../components/YesNoToggle";
import ResultCard from "../components/ResultCard";
import { getProfile } from "../services/profileService";
import { generateReport } from "../utils/generateReport";

const initialFormData = {
  period_length: 5,
  cycle_length: 28,
  age: 20,

  overweight: 0,
  weight_change: 0,
  irregular_periods: 0,
  difficulty_conceiving: 0,

  hair_chin: 0,
  hair_cheeks: 0,
  hair_breasts: 0,
  hair_upper_lips: 0,
  hair_arms: 0,
  hair_inner_thighs: 0,

  acne: 0,
  hair_loss: 0,
  dark_patches: 0,
  always_tired: 0,
  mood_swings: 0,

  exercise: 0,
  eat_outside: 0,
  canned_food: 0,
  relocated_city: 0,
};

const sections = [
  {
    title: "Menstrual Information",
    icon: <FaVenus />,
    fields: [
      {
        type: "number",
        name: "period_length",
        label: "Period Length",
      },
      {
        type: "number",
        name: "cycle_length",
        label: "Cycle Length",
      },
      {
        type: "number",
        name: "age",
        label: "Age",
      },
    ],
  },

  {
    title: "Hormonal Symptoms",
    icon: <FaUserMd />,
    fields: [
      { name: "overweight", label: "Overweight" },
      { name: "weight_change", label: "Weight Change" },
      {
        name: "irregular_periods",
        label: "Irregular Periods",
      },
      {
        name: "difficulty_conceiving",
        label: "Difficulty Conceiving",
      },
    ],
  },

  {
    title: "Hair Growth",
    icon: <FaLeaf />,
    fields: [
      { name: "hair_chin", label: "Hair on Chin" },
      { name: "hair_cheeks", label: "Hair on Cheeks" },
      { name: "hair_breasts", label: "Hair on Breasts" },
      {
        name: "hair_upper_lips",
        label: "Hair on Upper Lips",
      },
      { name: "hair_arms", label: "Hair on Arms" },
      {
        name: "hair_inner_thighs",
        label: "Hair on Inner Thighs",
      },
    ],
  },

  {
    title: "Other Symptoms",
    icon: <FaHeartbeat />,
    fields: [
      { name: "acne", label: "Acne" },
      { name: "hair_loss", label: "Hair Loss" },
      {
        name: "dark_patches",
        label: "Dark Patches",
      },
      {
        name: "always_tired",
        label: "Always Tired",
      },
      {
        name: "mood_swings",
        label: "Mood Swings",
      },
    ],
  },

  {
    title: "Lifestyle",
    icon: <FaRunning />,
    fields: [
      {
        name: "exercise",
        label: "Exercise Regularly",
      },
      {
        name: "eat_outside",
        label: "Eat Outside Frequently",
      },
      {
        name: "canned_food",
        label: "Eat Canned Food",
      },
      {
        name: "relocated_city",
        label: "Recently Relocated",
      },
    ],
  },
];

export default function Prediction() {
  const navigate = useNavigate();
  const resultRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState(initialFormData);

  const updateField = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchProfile();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const prediction = await predictPCOS(formData);

      setResult(prediction);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 250);
    } catch (err) {
      alert(
        err.response?.data?.detail ||
          "Prediction failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetPrediction = () => {
    setResult(null);

    setFormData(initialFormData);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
            <FaHeartbeat className="text-white text-2xl" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              PCOS Early Detection
            </h1>

            <p className="text-slate-400">
              AI Powered Healthcare Screening
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {sections.map((section) => (
            <PredictionSection
              key={section.title}
              title={section.title}
              icon={section.icon}
            >
              <div
                className={`grid gap-6 ${
                  section.title ===
                  "Menstrual Information"
                    ? "md:grid-cols-3"
                    : "md:grid-cols-2"
                }`}
              >
                {section.fields.map((field) => (
                  <div key={field.name}>
                    <label className="block mb-3 text-slate-300 font-medium">
                      {field.label}
                    </label>

                    {field.type === "number" ? (
                      <input
                        type="number"
                        min={
                          field.name === "age"
                            ? 12
                            : field.name ===
                              "period_length"
                            ? 1
                            : 20
                        }
                        max={
                          field.name === "age"
                            ? 60
                            : field.name ===
                              "period_length"
                            ? 15
                            : 60
                        }
                        placeholder={
                          field.name ===
                          "period_length"
                            ? "e.g. 5"
                            : field.name ===
                              "cycle_length"
                            ? "e.g. 28"
                            : "e.g. 20"
                        }
                        autoFocus={
                          field.name ===
                          "period_length"
                        }
                        value={formData[field.name]}
                        onChange={(e) =>
                          updateField(
                            field.name,
                            e.target.value
                          )
                        }
                        className="w-full rounded-xl bg-slate-900/60 border border-slate-700 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                      />
                    ) : (
                      <YesNoToggle
                        value={formData[field.name]}
                        onChange={(value) =>
                          updateField(
                            field.name,
                            value
                          )
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            </PredictionSection>
          ))}
                    <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              py-4
              text-lg
              font-bold
              text-white
              shadow-xl
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:shadow-blue-500/30
              disabled:opacity-70
              disabled:cursor-not-allowed
              disabled:scale-100
              flex
              items-center
              justify-center
              gap-3
            "
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                AI is analysing your health...
              </>
            ) : (
              <>
                <FaHeartbeat />
                Predict PCOS Risk
              </>
            )}
          </button>
        </form>

        {!result && (
          <div className="mt-14 rounded-3xl border border-dashed border-slate-700 bg-slate-900/40 backdrop-blur-xl p-14 text-center">
            <FaHeartbeat className="mx-auto mb-6 text-6xl text-blue-500" />

            <h2 className="text-3xl font-bold text-white">
              Ready for AI Prediction
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400 leading-7">
              Complete the questionnaire above to receive an AI-powered
              assessment of your PCOS risk. Your report will include a
              confidence score and personalized health recommendations based on
              your responses.
            </p>
          </div>
        )}

        {result && (
          <motion.div
            ref={resultRef}
            className="mt-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
          >
            <ResultCard
  result={result}
  profile={profile}
  onDashboard={() => navigate("/dashboard")}
  onReset={resetPrediction}
  onDownload={() => generateReport(profile, result)}
/>
          </motion.div>
        )}
      </div>
    </div>
  );
}