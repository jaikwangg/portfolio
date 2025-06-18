"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";
import Navigation from "@/components/Navigation";

const ThemeDemo = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
              Theme Demo
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Current theme: <span className="font-semibold capitalize">{theme}</span>
            </p>
            <div className="flex justify-center mb-8">
              <ThemeToggle />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Color Palette */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-black dark:text-white">Color Palette</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-black dark:bg-white rounded-lg border-2 border-gray-300 dark:border-gray-600"></div>
                  <div>
                    <p className="font-semibold text-black dark:text-white">Primary</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Black / White</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-600 dark:bg-gray-400 rounded-lg border-2 border-gray-300 dark:border-gray-600"></div>
                  <div>
                    <p className="font-semibold text-black dark:text-white">Secondary</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Gray-600 / Gray-400</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-gray-300 dark:border-gray-600"></div>
                  <div>
                    <p className="font-semibold text-black dark:text-white">Surface</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Gray-50 / Gray-800</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Interactive Elements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-black dark:text-white">Interactive Elements</h2>
              
              <div className="space-y-4">
                <button className="w-full border-2 border-black dark:border-white text-black dark:text-white px-6 py-3 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300">
                  Button
                </button>
                
                <input
                  type="text"
                  placeholder="Input field"
                  className="w-full px-4 py-3 border-2 border-black dark:border-white bg-transparent dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                />
                
                <div className="p-4 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-black dark:text-white">Card content</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Secondary text</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Theme Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 p-6 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Theme Features</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Automatic system preference detection</li>
              <li>• Persistent theme storage in localStorage</li>
              <li>• Smooth transitions between themes</li>
              <li>• Responsive design for all screen sizes</li>
              <li>• Accessible color contrast ratios</li>
              <li>• Custom scrollbar styling</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThemeDemo; 