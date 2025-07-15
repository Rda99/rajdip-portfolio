import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 py-6 sm:py-8 md:py-12">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center"
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-orange-500 px-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Rajdip Dutta
        </motion.h1>
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-white/90 px-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-orange-500">Data Analyst</span> & Engineer
        </motion.h2>
        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed px-4 sm:px-0">
          Highly skilled Data Analyst & Engineer with 4+ years of experience delivering advanced analytics & engineering
          solutions across Finance, Insurance, E-commerce, Media Entertainment, and Construction sectors.
        </p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-orange-500 text-black font-bold py-3 px-6 sm:px-8 rounded-lg hover:bg-orange-600 transition-colors text-center w-full sm:w-auto"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;