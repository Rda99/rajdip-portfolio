import { motion } from "framer-motion";
import SpiderWeb from "@/components/SpiderWeb";
import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SpiderWeb />
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
  );
};

export default Home;
