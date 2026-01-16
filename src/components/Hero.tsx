"use client";

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-sky-100 to-blue-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-slate-900" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 dark:bg-blue-500/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-float" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-sky-300 dark:bg-sky-500/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-float-slow animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-400 dark:bg-blue-600/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-float animation-delay-4000" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(236,72,153,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left "
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10"
            >
              {/* <span className="inline-block px-4 py-2 glass-card rounded-full text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">
                👋 Welcome to my portfolio
              </span> */}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight"
            >
              <span className="text-slate-800 dark:text-slate-100">Hi, I am</span>
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-sky-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
                Jaikwang
              </span>
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 mb-8 font-light"
            >
              Full Stack Developer & <span className="text-blue-600 dark:text-blue-400 font-semibold">UX/UI Designer</span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex gap-6 mb-8"
            >
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="glass-card px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 transition-all duration-300 shadow-lg hover:shadow-xl glow-blue"
              >
                View My Work
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="glass-card px-8 py-4 rounded-2xl font-semibold text-blue-600 dark:text-blue-400 border-2 border-blue-500/50 dark:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300"
              >
                Contact Me
              </motion.a>
            </motion.div>

            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex space-x-4"
            >
              {/* GitHub */}
              <motion.a
                href="https://github.com/jaikwangg"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300"
                aria-label="GitHub"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>

              {/* Instagram */}
              <motion.a
                href="https://instagram.com/worajai_"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right side - Portrait image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Glowing background circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-sky-400/20 rounded-full blur-3xl animate-pulse" />
              
              {/* Portrait container */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative glass-card rounded-3xl p-8 backdrop-blur-xl"
              >
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-200 to-sky-200 dark:from-blue-900/30 dark:to-sky-900/30 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-sky-400 flex items-center justify-center text-4xl font-bold text-white">
                      JK
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Professional Portrait</p>
                  </div>
                </div>
                
                {/* Floating decorative elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 w-16 h-16 glass-card rounded-full flex items-center justify-center"
                >
                  <span className="text-2xl">💻</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-4 w-16 h-16 glass-card rounded-full flex items-center justify-center"
                >
                  <span className="text-2xl">✨</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 glass-card rounded-full flex justify-center border border-blue-500/30"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-gradient-to-b from-blue-500 to-sky-500 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 