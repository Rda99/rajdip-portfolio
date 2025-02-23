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
      className="text-orange-500"
    >
      <motion.circle
        cx="20"
        cy="20"
        r="16"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M12 20 L28 20 M20 12 L20 28"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
      />
      <motion.circle
        cx="20"
        cy="20"
        r="4"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.svg>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2"
          >
            <LogoIcon />
            <span className="text-orange-500 font-bold text-xl">Rajdip Dutta</span>
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