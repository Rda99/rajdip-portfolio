import { motion } from "framer-motion";
import { FiGithub, FiChevronDown } from "react-icons/fi";
import { useState } from "react";

const projects = [
  {
    title: "Fraud Detection Model",
    description: "Developed a machine learning model using Python, scikit-learn and A/B Testing to detect fraudulent transactions. The model achieved an accuracy of 92% and demonstrated potential savings through early fraud detection and prevention of fraudulent transactions.",
    technologies: ["Python", "scikit-learn", "A/B Testing", "Pandas", "NumPy"],
    github: "https://github.com/Rda99/Fraud-Detection"
  },
  {
    title: "Customer Churn Analysis",
    description: "Conducted customer churn analysis using PySpark on Azure Databricks. Identified key factors influencing churn and provided recommendations for customer retention strategies. Utilized advanced machine learning techniques to predict churn probability and segment customers based on behavior patterns.",
    technologies: ["PySpark", "Azure Databricks", "Machine Learning", "SQL", "Data Visualization"],
    github: "https://github.com/Rda99/E-Commerce-Churn-Prediction"
  }
];

const Projects = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const isExpanded = (index: number) => {
    return expandedIndex === index || (expandedIndex === null && hoveredIndex === index);
  };

  return (
    <section id="projects" className="py-8 sm:py-12 md:py-16 lg:py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-4xl font-bold text-orange-500 mb-8 sm:mb-10 lg:mb-12 text-center"
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-black/50 p-4 sm:p-6 rounded-lg border border-orange-500/20 hover:border-orange-500/40 transition-all cursor-pointer"
              onClick={() => toggleExpand(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                <h3 className="text-lg sm:text-xl font-bold text-orange-500 break-words flex-1">
                  {project.title}
                </h3>
                <div className="flex gap-2 items-center self-start sm:self-center">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiGithub size={24} />
                  </motion.a>
                  <motion.div
                    animate={{
                      rotate: isExpanded(index) ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown className="text-orange-500" size={20} />
                  </motion.div>
                </div>
              </div>

              <motion.div
                animate={{
                  height: isExpanded(index) ? "auto" : 0,
                  opacity: isExpanded(index) ? 1 : 0,
                }}
                initial={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-gray-300 my-4 text-sm sm:text-base leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-orange-500/10 text-orange-500 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;