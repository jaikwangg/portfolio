"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
  const pathname = usePathname();
//   const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();
  const headerHeight = useTransform(scrollY, [0, 100], [80, 60]);
  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 100], [8, 12]);

  useEffect(() => {
    const checkMobile = () => {
      // setIsMobile(window.innerWidth < 768);
    };
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/", id: "home" },
    { name: "Projects", path: "/projects", id: "projects" },
    { name: "About", path: "/about", id: "about" },
    { name: "Contact", path: "/contact", id: "contact" },
  ];

  const handleMobileNavClick = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      style={{
        height: headerHeight,
      }}
      className={`fixed top-4 left-4 right-4 z-50 glass rounded-2xl transition-all duration-300 ${
        isScrolled ? "shadow-xl glow-purple" : "shadow-lg"
      }`}
    >
      <div className="container mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          <Link 
            href="/" 
            className="text-xl font-bold relative group"
          >
            <span className="relative z-10 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">JK</span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg -z-10 blur-sm"
              initial={false}
              animate={{ scale: isScrolled ? 1 : 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative group px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                  pathname === item.path 
                    ? "text-purple-600 dark:text-purple-400" 
                    : "text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400"
                }`}
              >
                {item.name}
                {pathname === item.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg -z-10"
                  />
                )}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg -z-10 scale-0 group-hover:scale-100 transition-transform duration-300"
                  initial={false}
                />
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Theme Toggle for Mobile */}
            <ThemeToggle />
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg glass-card hover:bg-purple-500/10 transition-colors duration-300"
            >
              <svg
                className="w-6 h-6 text-slate-700 dark:text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 right-0 mt-2 glass-card rounded-2xl shadow-xl"
              >
                <div className="container mx-auto px-6 py-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleMobileNavClick(item.id)}
                      className="block w-full text-left py-3 px-4 rounded-lg text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-300"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation; 