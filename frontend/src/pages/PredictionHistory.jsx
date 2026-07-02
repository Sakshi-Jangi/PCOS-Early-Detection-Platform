import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaHistory,
  FaArrowLeft,
  FaHeartbeat,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import { getPredictionHistory } from "../services/predictionHistoryService";

export default function PredictionHistory() {
  const navigate = useNavigate();

  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getPredictionHistory();
        setPredictions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading Prediction History...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

      {/* Header */}

      <div className="sticky top-0 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">

        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">

              <FaHistory className="text-white text-2xl"/>

            </div>

            <div>

              <h1 className="text-3xl text-white font-bold">
                Prediction History
              </h1>

              <p className="text-slate-400">
                Previous AI Assessments
              </p>

            </div>

          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl bg-blue-600 px-5 py-3 text-white"
          >
            <FaArrowLeft className="inline mr-2"/>
            Dashboard
          </button>

        </div>

      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {predictions.length === 0 ? (

          <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/40 p-12 text-center"
          >

            <FaHeartbeat className="mx-auto text-6xl text-blue-500"/>

            <h2 className="mt-6 text-3xl font-bold text-white">
              No Prediction History
            </h2>

            <p className="mt-4 text-slate-400">
              Complete your first prediction to see it here.
            </p>

          </motion.div>

        ) : (

          <div className="space-y-6">

            {predictions.map((item,index)=>{

              const lowRisk = item.prediction.includes("Low");

              return(

                <motion.div
                  key={item.id}
                  initial={{opacity:0,y:20}}
                  animate={{opacity:1,y:0}}
                  transition={{delay:index*0.08}}
                  className={`rounded-3xl p-8 border shadow-xl ${
                    lowRisk
                    ? "border-green-500/30 bg-green-500/10"
                    : "border-red-500/30 bg-red-500/10"
                  }`}
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <div className="flex items-center gap-3">

                        {lowRisk
                          ? <FaCheckCircle className="text-green-400 text-3xl"/>
                          : <FaExclamationTriangle className="text-red-400 text-3xl"/>
                        }

                        <h2 className={`text-3xl font-bold ${
                          lowRisk
                          ? "text-green-400"
                          : "text-red-400"
                        }`}>
                          {item.prediction}
                        </h2>

                      </div>

                      <p className="mt-4 text-slate-300">
                        Confidence : {item.confidence}%
                      </p>

                      <p className="text-slate-400 mt-2">
                        Date :
                        {" "}
                        {new Date(item.created_at).toLocaleDateString("en-IN")}
                      </p>

                    </div>

                    <div className="w-40">

                      <div className="h-4 bg-slate-700 rounded-full overflow-hidden">

                        <div
                          style={{
                            width:`${item.confidence}%`
                          }}
                          className={`h-full ${
                            lowRisk
                            ? "bg-green-500"
                            : "bg-red-500"
                          }`}
                        />

                      </div>

                    </div>

                  </div>

                </motion.div>

              )

            })}

          </div>

        )}

      </div>

    </div>
  );

}