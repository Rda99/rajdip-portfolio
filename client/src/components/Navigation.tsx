import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

const Navigation = () => {
  const [location] = useLocation();

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

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
      {/* Outer hexagon shape */}
      <motion.path
        d="M20 4 L32 10 L32 30 L20 36 L8 30 L8 10 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Inner data points and connections */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {/* Data points */}
        <motion.circle cx="20" cy="12" r="2" fill="currentColor" />
        <motion.circle cx="28" cy="16" r="2" fill="currentColor" />
        <motion.circle cx="28" cy="24" r="2" fill="currentColor" />
        <motion.circle cx="20" cy="28" r="2" fill="currentColor" />
        <motion.circle cx="12" cy="24" r="2" fill="currentColor" />
        <motion.circle cx="12" cy="16" r="2" fill="currentColor" />

        {/* Central node with pulse animation */}
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

        {/* Connecting lines with animation */}
        <motion.path
          d="M20 12 L28 16 L28 24 L20 28 L12 24 L12 16 Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1, repeat: Infinity }}
        />

        {/* Radiating lines */}
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16"> {/* Changed justify-between to justify-center */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center"
          >
            <LogoIcon />
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className={`text-white hover:text-orange-500 transition-colors ${
                  location === item.href ? "text-orange-500" : ""
                }`}>
                  {item.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;