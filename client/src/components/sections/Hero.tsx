import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-orange-500">Data Analyst</span> & Engineer
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
          Highly skilled Data Analyst/Engineer with 3+ years of experience delivering advanced analytics & engineering
          solutions across Finance, Insurance, E-commerce, Media Entertainment, and Construction sectors.
        </p>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-orange-500 text-black font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Get in Touch
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
