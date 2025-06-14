import { memo } from "react";
import { motion } from "framer-motion";

interface LandingHeroProps {
  isDarkMode: boolean;
}

const LandingHero = memo(({ isDarkMode }: LandingHeroProps) => {
  return (
    <div className="relative z-10 h-full flex items-center justify-center">
      <div className="text-center space-y-8 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-8xl font-extrabold text-white tracking-tight">
            <div className="bg-clip-text space-x-5 md:flex-row flex-col flex text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              <span>Hello,</span>
              <span>I'm Anmol</span>
            </div>
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[90%] md:text-3xl text-white/90 font-light"
          >
            <span className="inline-block">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="inline-block"
              >
                Full-Stack Developer
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="inline-block mx-2"
              >
                •
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="inline-block"
              >
                Digital Craftsman
              </motion.span>
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex gap-6 justify-center"
        >
          <a
            href="#projects"
            className="group relative px-4 py-3 md:px-8 md:py-3 text-[90%] md:text-lg font-medium text-white transition-all duration-300"
          >
            <span className="relative z-10">Explore My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
          </a>
          <a
            href="#contact"
            className="group relative px-4 py-3 md:px-8 md:py-3 text-[90%] md:text-lg font-medium text-white transition-all duration-300"
          >
            <span className="relative z-10">Contact Me</span>
            <div className="absolute inset-0 border-2 border-white/30 rounded-lg group-hover:border-white/50 transition-colors duration-300" />
            <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </motion.div>
      </div>
    </div>
  );
});

LandingHero.displayName = "LandingHero";

export default LandingHero; 