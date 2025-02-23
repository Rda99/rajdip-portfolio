import { motion } from "framer-motion";

const experiences = [
  {
    company: "Innovaccer Analytics Pvt Ltd.",
    location: "Noida, India",
    position: "Data Analyst/Engineer",
    period: "Nov 2024 - Present",
    achievements: [
      "Led data analytics and engineering projects in the US healthcare industry",
      "Built end-to-end data engineering pipelines",
      "25% improvement in reporting efficiency"
    ]
  },
  {
    company: "Pricewaterhouse Coopers (PwC) Pvt Ltd.",
    location: "Kolkata, India",
    position: "Data Analyst/Engineer",
    period: "Sept 2021 - Oct 2024",
    achievements: [
      "15% improvement in targeted marketing efforts",
      "30% reduction in manual workload",
      "95% accuracy in client reporting",
      "20% improvement in database performance"
    ]
  }
];

const Experience = () => {
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

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative border-l-2 border-orange-500 pl-8 pb-8"
            >
              <div className="absolute -left-2 top-0 w-4 h-4 bg-orange-500 rounded-full" />
              <div className="bg-black/50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-orange-500">{exp.company}</h3>
                <p className="text-gray-400 mb-2">{exp.location}</p>
                <p className="text-lg font-semibold mb-2">{exp.position}</p>
                <p className="text-gray-400 mb-4">{exp.period}</p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
