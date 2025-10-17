import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const getChildID = (children) => {
  const child = React.Children.only(children);
  if ("id" in child.props) {
    return child.props.id;
  }
};

const Field = ({ label, children, htmlFor, error }) => {
  const id = htmlFor || getChildID(children);

  return (
    <motion.div
      className="mb-6 w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Fixed Label */}
      {label && (
        <motion.label
          htmlFor={id}
          className="auth-label block mb-2 text-gray-300 text-sm sm:text-base font-medium"
          whileHover={{ color: "#10B981", x: 2 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {label}
        </motion.label>
      )}

      {/* Input Field Wrapper */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="relative"
      >
        {React.cloneElement(children, {
          className: `w-full rounded-xl bg-gray-800/40 text-gray-100 placeholder-gray-400 
          px-4 py-3 border transition-all duration-300 outline-none 
          focus:border-lwsGreen focus:shadow-[0_0_10px_#10B98150] text-sm sm:text-base
          ${error ? "border-red-500" : "border-gray-600/50"}`,
        })}
      </motion.div>

      {/* Animated Error Message */}
      <AnimatePresence>
        {error?.message && (
          <motion.div
            key="error"
            role="alert"
            className="text-red-400 text-xs sm:text-sm mt-1 font-medium"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {error.message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Field;
