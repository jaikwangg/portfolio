"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
        <div className="relative w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 p-1">
          <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
        </div>
      );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-20 h-8 rounded-full bg-gray-200 dark:bg-gray-700 blue-ocean:bg-blue-900 p-1 transition-colors duration-300 flex items-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'blue-ocean' : 'light'} mode`}
    >
      <motion.div
        className="w-6 h-6 rounded-full bg-white shadow-md"
        animate={{
          x: theme === 'light' ? 0 : theme === 'dark' ? 28 : 56,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />
      
      {/* Icons Container */}
      <div className="absolute inset-0 flex items-center justify-around w-full">
        {/* Sun Icon */}
        <motion.svg
          className="w-4 h-4 text-yellow-500"
          animate={{
            opacity: theme === 'light' ? 1 : 0.5,
            scale: theme === 'light' ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </motion.svg>

        {/* Moon Icon */}
        <motion.svg
          className="w-4 h-4 text-blue-400"
          animate={{
            opacity: theme === 'dark' ? 1 : 0.5,
            scale: theme === 'dark' ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </motion.svg>

        {/* Water Icon */}
        <motion.svg
          className="w-4 h-4 text-cyan-400"
          animate={{
            opacity: theme === 'blue-ocean' ? 1 : 0.5,
            scale: theme === 'blue-ocean' ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.62 6.38a1 1 0 011.41 0l1.42 1.42a1 1 0 001.41 0l1.42-1.42a1 1 0 111.41 1.41l-1.42 1.42a1 1 0 000 1.41l1.42 1.42a1 1 0 11-1.41 1.41l-1.42-1.42a1 1 0 00-1.41 0l-1.42 1.42a1 1 0 11-1.41-1.41l1.42-1.42a1 1 0 000-1.41L6.62 7.8a1 1 0 010-1.42z"
            clipRule="evenodd"
          />
        </motion.svg>
      </div>
    </motion.button>
  );
};

export default ThemeToggle; 