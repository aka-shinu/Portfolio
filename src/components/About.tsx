import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../App";

export default function About() {
  const { isDarkMode } = useContext(ThemeContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section
      id="about"
      className={`section ${isDarkMode ? "bg-secondary-900" : "bg-white"}`}
    >
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="relative group">
            <div className="aspect-square rounded-2xl overflow-hidden transform transition-transform duration-500 group-hover:scale-105 relative z-[2]">
              <img
                src="/image.webp"
                alt="Anmol"
                width={"100%"}
                height={"100%"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="absolute inset-0 rounded-2xl z-[1]  border-2 border-primary-500 transform translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                isDarkMode ? "text-white" : "text-secondary-900"
              }`}
            >
              About Me
            </h2>
            <p
              className={`text-[90%] md:text-lg leading-relaxed ${
                isDarkMode ? "text-secondary-300" : "text-secondary-600"
              }`}
            >
              I'm a full-stack developer who helps solo founders and early-stage
              startups bring their product ideas to life — fast, clean, and with
              care. I specialize in building scalable MVPs and modern web apps
              using tools like Next.js, Tailwind, Supabase, and WebSockets. From
              sleek user interfaces to reliable backend systems, I focus on
              writing clean, maintainable code that delivers real-world value.
            </p>
            <p
              className={`text-lg leading-relaxed ${
                isDarkMode ? "text-secondary-300" : "text-secondary-600"
              }`}
            >
              Whether it’s an idea on a napkin or an early product that needs
              polish, I love turning ideas into launch-ready applications that
              feel smooth and look professional.
            </p>
            <div className="pt-4">
              <h3 className={`text-2xl font-semibold text-primary-500 mb-4`}>
                Mission Statement
              </h3>
              <p
                className={`text-lg leading-relaxed ${
                  isDarkMode ? "text-secondary-300" : "text-secondary-600"
                }`}
              >
                My mission is to use technology to build intuitive, impactful
                solutions that solve real problems — with a strong focus on
                clean code, performance, and exceptional user experience.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              {[
                { title: "Clean Code", icon: "💻" },
                { title: "User-Centric", icon: "🎯" },
                { title: "Innovation", icon: "💡" },
                { title: "Learning", icon: "📚" },
              ].map((value) => (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  className={`p-4 rounded-lg ${
                    isDarkMode ? "bg-secondary-800" : "bg-secondary-50"
                  }`}
                >
                  <div className="text-2xl mb-2">{value.icon}</div>
                  <h4
                    className={`font-semibold ${
                      isDarkMode ? "text-white" : "text-secondary-900"
                    }`}
                  >
                    {value.title}
                  </h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
