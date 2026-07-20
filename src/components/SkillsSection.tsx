import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Globe, Database, Wrench, Network, Award } from "lucide-react";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    skills: ["Java", "Python"],
  },
  {
    title: "Frontend",
    icon: Globe,
    skills: ["HTML5", "CSS3", "React.js", "AngularJS"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["SQL"],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["GitHub", "VS Code", "Canva","Netlify"],
  },
  {
    title: "Core Fundamentals",
    icon: Network,
    skills: [
      "OOP",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
    ],
  },
];

const certifications = [
  {
    name: "Python 101 for Data Science",
    issuer: "IBM Cognitive Class",
  },
  {
    name: "Data Science & Analytics",
    issuer: "HP LIFE",
  },
  {
    name: "Networking Basics",
    issuer: "Cisco Networking Academy",
  },
  {
    name: "Introduction to MongoDB",
    issuer: "MongoDB Learning Path",
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-heading text-center"
        >
          Skills
        </motion.h2>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="glass-panel-hover p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/20">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm bg-secondary/50 text-foreground rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-center flex items-center justify-center gap-3">
            <Award className="h-6 w-6 text-primary" />
            Certifications
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="glass-panel p-5 text-center"
              >
                <h4 className="font-medium mb-1">{cert.name}</h4>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
