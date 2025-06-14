import { memo } from "react";
import { motion } from "framer-motion";

interface LandingNavigationProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const LandingNavigation = memo(({ isDarkMode, toggleTheme }: LandingNavigationProps) => {
  const navigationItems = ["About", "Skills", "Projects", "Contact"];

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 p-6">
      <div className="container-custom flex justify-between items-center">
        <motion.a
          href="#"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-white"
        >
          Anmol
        </motion.a>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex gap-8"
        >
          {navigationItems.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/80 hover:text-white transition-colors relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 2) }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-300 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </nav>
  );
});

LandingNavigation.displayName = "LandingNavigation";

export default LandingNavigation; 