import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const experiences = [
  {
    company: "Innovaccer Analytics Pvt Ltd.",
    location: "Noida, India",
    position: "Data Analyst/Engineer",
    period: "Nov 2024 - Present",
    achievements: [
      "Led data analytics and engineering projects in the US healthcare industry, utilizing SQL and Alteryx to improve data processing efficiency and support decision-making",
      "Built end-to-end data engineering pipelines using in-house schemas and the Dap tool, enhancing data integration for various healthcare clients",
      "Leveraged advanced SQL, data engineering, Snowflake, and Power BI to streamline data workflows, resulting in a 25% improvement in reporting efficiency",
      "Collaborated with cross-functional teams to implement data quality measures and optimize healthcare analytics solutions"
    ]
  },
  {
    company: "Pricewaterhouse Coopers (PwC) Pvt Ltd.",
    location: "Kolkata, India",
    position: "Data Analyst/Engineer",
    period: "Sept 2021 - Oct 2024",
    achievements: [
      "Conducted customer segmentation analysis for e-commerce clients, leading to a 15% improvement in targeted marketing efforts",
      "Developed and maintained interactive Power BI & Tableau dashboards, reducing manual workload by 30% and improving reporting efficiency by 25%",
      "Established data quality checks, risk control measures, and governance policies, ensuring 95% accuracy in client reporting",
      "Optimized database performance, improving data storage efficiency and reducing processing time by 20%",
      "Applied statistical methods and predictive modeling for forecasting, resulting in a 15% increase in market trend prediction accuracy",
      "Implemented large-scale data querying using SQL and BigQuery, processing 500GB+ datasets with 99.7% accuracy",
      "Led a team of 3 analysts in developing automated reporting solutions for key stakeholders"
    ]
  },
  {
    company: "Technology Risk Partners",
    location: "Kolkata, India",
    position: "GRC Consultant",
    period: "Apr 2021 - May 2021",
    achievements: [
      "Assisted in the delivery of 5 GRC projects, contributing to strategy development and implementation plans that improved client risk visibility by 15%",
      "Supported sales efforts by preparing materials for 10+ client meetings and demonstrations, helping to secure 2 new accounts",
      "Collaborated on risk management product development, aiding in the creation of 1 new solution and documenting 3 existing products",
      "Achieved 10% increase in user adoption rates through improved documentation and training materials"
    ]
  }
];

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-4xl font-bold text-orange-500 mb-12 text-center"
        >
          Professional Journey
        </motion.h2>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative border-l-2 border-orange-500 pl-8"
            >
              <div className="absolute -left-2 top-0 w-4 h-4 bg-orange-500 rounded-full" />
              <motion.div 
                className="bg-black/50 p-6 rounded-lg border border-orange-500/20 cursor-pointer"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-orange-500">{exp.company}</h3>
                    <p className="text-gray-400">{exp.location}</p>
                  </div>
                  <motion.div
                    animate={{
                      rotate: expandedIndex === index ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown className="text-orange-500" size={20} />
                  </motion.div>
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
                  <div className="mt-4">
                    <p className="text-lg font-semibold mb-2">{exp.position}</p>
                    <p className="text-gray-400 mb-4">{exp.period}</p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          <span className="text-gray-300">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;