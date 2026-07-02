import { motion } from "framer-motion";
import {
  FaIdBadge,
  FaUser,
  FaEnvelope,
  FaBirthdayCake,
} from "react-icons/fa";

const icons = {
  id: <FaIdBadge />,
  user: <FaUser />,
  email: <FaEnvelope />,
  age: <FaBirthdayCake />,
};

export default function ProfileInfoCard({
  title,
  value,
  icon,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        rounded-3xl
        border
        border-slate-700
        bg-white/5
        backdrop-blur-xl
        p-6
        shadow-xl
        hover:border-cyan-500/40
        transition-all
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="mt-4 text-2xl font-bold text-white break-words">
            {value}
          </h2>
        </div>

        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            flex
            items-center
            justify-center
            text-white
            text-2xl
            shadow-lg
          "
        >
          {icons[icon]}
        </div>
      </div>

      <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-slate-700">
        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: "100%",
          }}
          transition={{
            duration: 0.8,
          }}
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
        />
      </div>
    </motion.div>
  );
}