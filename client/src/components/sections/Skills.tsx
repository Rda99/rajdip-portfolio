import { motion } from "framer-motion";

const skills = {
  Languages: ["Python", "R", "JavaScript", "SQL", "Bash"],
  "BI & Visualization": ["Power BI", "Tableau", "Looker Studio"],
  "Data Management": ["Alteryx", "SQL Databases", "Snowflake", "Dataiku", "Databricks", "Apache Airflow", "Azure", "Dbt"],
  "Big Data Technologies": ["PySpark", "Spark", "Azure"],
  "Statistical Analysis": ["Regression", "Classification", "Clustering", "Time Series Prediction"],
  "Soft Skills": ["Leadership", "Collaboration", "Time Management", "Effective Communication"]
};

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-4xl font-bold text-orange-500 mb-12 text-center"
        >
          Technical Expertise
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, items], index) => (
            <motion.div
              key={category}
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black/50 p-6 rounded-lg border border-orange-500/20"
            >
              <h3 className="text-xl font-semibold mb-4 text-orange-500">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
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

export default Skills;
