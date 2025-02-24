import { motion } from "framer-motion";
import { FiGithub, FiChevronDown } from "react-icons/fi";
import { useState } from "react";

const projects = [
  {
    title: "Fraud Detection Model",
    description: "Developed a machine learning model using Python, scikit-learn and A/B Testing to detect fraudulent transactions. The model achieved an accuracy of 92% and demonstrated potential savings through early fraud detection and prevention of fraudulent transactions.",
    technologies: ["Python", "scikit-learn", "A/B Testing", "Pandas", "NumPy"],
    github: "https://github.com/yourusername/fraud-detection"
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

  const handleExpand = (index: number) => {
    setExpandedIndex(index);
  };

  return (
    <section id="projects" className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-4xl font-bold text-orange-500 mb-12 text-center"
        >
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-black/50 p-6 rounded-lg border border-orange-500/20 hover:border-orange-500/40 transition-all cursor-pointer"
              onClick={() => setExpandedIndex(index === expandedIndex ? null : index)}
              onMouseEnter={() => handleExpand(index)}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-orange-500">
                  {project.title}
                </h3>
                <div className="flex gap-2 items-center">
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
                      rotate: expandedIndex === index ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown className="text-orange-500" size={20} />
                  </motion.div>
                </div>
              </div>

              <motion.div
                animate={{
                  height: expandedIndex === index ? "auto" : 0,
                  opacity: expandedIndex === index ? 1 : 0,
                }}
                initial={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-gray-300 my-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-sm"
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