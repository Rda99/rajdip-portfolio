import { motion } from "framer-motion";

const projects = [
  {
    title: "Fraud Detection Model",
    description: "Developed a machine learning model using Python, scikit-learn and A/B Testing to detect fraudulent transactions. The model achieved an accuracy of 92% and demonstrated potential savings",
    technologies: ["Python", "scikit-learn", "A/B Testing"]
  },
  {
    title: "Customer Churn Analysis",
    description: "Conducted customer churn analysis using PySpark on Azure Databricks. Identified key factors influencing churn and provided recommendations for customer retention strategies.",
    technologies: ["PySpark", "Azure Databricks", "Machine Learning"]
  }
];

const Projects = () => {
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
              className="bg-black/50 p-6 rounded-lg border border-orange-500/20"
            >
              <h3 className="text-xl font-bold text-orange-500 mb-3">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
