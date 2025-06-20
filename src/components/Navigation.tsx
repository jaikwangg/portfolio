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
        backgroundColor: `rgba(255, 255, 255, ${headerOpacity.get()})`,
        backdropFilter: `blur(${headerBlur.get()}px)`,
      }}
      className={`fixed top-4 left-4 right-4 z-50 rounded-2xl border border-white/20 dark:border-gray-700/20 transition-all duration-300 ${
        isScrolled ? "shadow-lg dark:shadow-gray-900/20" : "shadow-md dark:shadow-gray-900/10"
      } dark:bg-gray-800/80`}
    >
      <div className="container mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          <Link 
            href="/" 
            className="text-xl font-bold relative group"
          >
            <span className="relative z-10 text-black dark:text-white">JK</span>
            <motion.span
              className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-lg -z-10"
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
                className={`relative group px-3 py-2 rounded-lg transition-all duration-300 ${
                  pathname === item.path 
                    ? "text-black dark:text-white" 
                    : "text-black dark:text-gray-900 hover:text-black dark:hover:text-black"
                }`}
              >
                {item.name}
                {pathname === item.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-lg -z-10"
                  />
                )}
                <motion.span
                  className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-lg -z-10 scale-0 group-hover:scale-100 transition-transform duration-300"
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
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300"
            >
              <svg
                className="w-6 h-6 text-black dark:text-white"
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
                className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-lg"
              >
                <div className="container mx-auto px-6 py-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleMobileNavClick(item.id)}
                      className="block w-full text-left py-3 px-4 rounded-lg text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
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