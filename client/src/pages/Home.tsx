import { motion } from "framer-motion";
import SpiderWeb from "@/components/SpiderWeb";
import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Globe from "@/components/Globe";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden">
        <Globe />
        <SpiderWeb />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;