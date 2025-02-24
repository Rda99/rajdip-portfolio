import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { SiLinkedin, SiGithub } from "react-icons/si";
import { FaFileAlt, FaCoffee, FaLaptopCode, FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";

const Navigation = () => {
  const [location] = useLocation();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Apply theme to body and update all background colors
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResumeClick = () => {
    window.open("https://drive.google.com/file/d/10u4_k9Y3nrZkSdudyZnVy-w6uvpxL7KA/view?usp=sharing", "_blank");
  };

  const LogoIcon = () => (
    <motion.svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="text-orange-500"
    >
      <motion.path
        d="M20 4 L32 10 L32 30 L20 36 L8 30 L8 10 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.circle cx="20" cy="12" r="2" fill="currentColor" />
        <motion.circle cx="28" cy="16" r="2" fill="currentColor" />
        <motion.circle cx="28" cy="24" r="2" fill="currentColor" />
        <motion.circle cx="20" cy="28" r="2" fill="currentColor" />
        <motion.circle cx="12" cy="24" r="2" fill="currentColor" />
        <motion.circle cx="12" cy="16" r="2" fill="currentColor" />

        <motion.circle
          cx="20"
          cy="20"
          r="3"
          fill="currentColor"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <motion.path
          d="M20 12 L28 16 L28 24 L20 28 L12 24 L12 16 Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1, repeat: Infinity }}
        />

        <motion.g
          animate={{ 
            rotate: 360,
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <line x1="20" y1="15" x2="20" y2="25" stroke="currentColor" strokeWidth="1" />
          <line x1="15" y1="20" x2="25" y2="20" stroke="currentColor" strokeWidth="1" />
        </motion.g>
      </motion.g>
    </motion.svg>
  );

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 ${isDark ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-sm`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center"
            >
              <LogoIcon />
            </motion.div>
            <div className="hidden md:flex space-x-8 ml-auto">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`hover:text-orange-500 transition-colors ${
                    location === item.href ? "text-orange-500" : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <footer className={`fixed bottom-0 left-0 w-full ${isDark ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-sm py-2`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>Made with</span>
              <FaLaptopCode className="text-orange-500" />
              <span>&</span>
              <FaCoffee className="text-orange-500" />
            </div>

            <motion.button
              onClick={() => setIsDark(!isDark)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-orange-500 text-black"
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
            </motion.button>

            <div className="flex items-center space-x-4">
              <motion.a
                href="https://www.linkedin.com/in/rajdip-dutta-data-analyst/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                aria-label="Visit LinkedIn Profile"
              >
                <SiLinkedin size={20} />
              </motion.a>
              <motion.a
                href="https://github.com/Rda99"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                aria-label="Visit GitHub Profile"
              >
                <SiGithub size={20} />
              </motion.a>
              <motion.button
                onClick={handleResumeClick}
                className="hover:text-orange-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                aria-label="Download Resume"
              >
                <FaFileAlt size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Navigation;