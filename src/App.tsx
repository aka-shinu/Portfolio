import { Canvas } from "@react-three/fiber";
import {
  Suspense,
  createContext,
  useState,
  useEffect,
  useRef,
  lazy,
} from "react";
import BlobLoader from "./components/BlobLoader";

const ThreeScene = lazy(() => import("./components/ThreeScene"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

import { motion } from "framer-motion";

export const ThemeContext = createContext({
  isDarkMode: true,
  toggleTheme: () => {},
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [count, setCount] = useState<number>(1500);
  const [maxConnectionsPerPoint, setMaxConnectionsPerPoint] =
    useState<number>(3);
  const [beamSpeed, setBeamSpeed] = useState(0.5);
  const frameTimes = useRef<number[]>([]);
  const landingRef = useRef(null);
  const [isLandingVisible, setIsLandingVisible] = useState(true);

  const [isLoaded, setIsLoaded] = useState(false);
  const [canStartRendering, setCanStartRendering] = useState(false);
  useEffect(() => {
    const start = () => setCanStartRendering(true);
  
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => setTimeout(start, 300));
    } else {
      setTimeout(start, 600);
    }
  }, []);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsLandingVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "50px" }
    );
    if (landingRef.current) observer.observe(landingRef.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    let frame = 0;
    let last = performance.now();

    function testFrame() {
      const now = performance.now();
      if (frame > 0) {
        frameTimes.current.push(now - last);
      }
      last = now;
      frame++;
      if (frame < 10) {
        requestAnimationFrame(testFrame);
      } else {
        // Calculate average frame time
        const avgFrameTime =
          frameTimes.current.reduce((a, b) => a + b, 0) /
          frameTimes.current.length;
        const avg = 1000 / avgFrameTime; // ✅ This is the actual FPS
        // Set speed: slower on slower devices
        if (avg >= 50) {
          // High-end device
          setBeamSpeed(0.5);
          setMaxConnectionsPerPoint(5);
          setCount(1500);
        } else if (avg >= 30) {
          // Medium device
          setBeamSpeed(0.3);
          setMaxConnectionsPerPoint(4);
          setCount(600);
        } else {
          // Low-end device
          setBeamSpeed(0.3);
          setMaxConnectionsPerPoint(2);
          setCount(500);
        }

        setIsTestCompleted(true);
      }
    }
    requestAnimationFrame(testFrame);
  }, []);
  useEffect(() => {
    // Apply theme class to body
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);
  useEffect(()=>{console.log(canStartRendering)}, [canStartRendering])
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return isTestCompleted ? (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <BlobLoader isLoaded={isLoaded} />
      <div className="absolute inset-0 blur-custom"></div>

      <div
        className={`min-h-screenfix ${
          isDarkMode ? "dark bg-secondary-900" : "bg-white"
        }`}
      >
        <button
          onClick={toggleTheme}
          className="fixed top-6 right-6 z-30 p-2 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>

        <section
          ref={landingRef}
          className="relative h-screen w-full overflow-hidden"
        >
          {/* Three.js Canvas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: canStartRendering ? 1 : 0 }}
            transition={{ duration: 2}}
            className="absolute inset-0"
          >
            {canStartRendering && (
              <Canvas
                camera={{ position: [0, 0, 2], fov: 75 }}
                onCreated={() => setIsLoaded(true)}
                dpr={[1, 1.5]}
              >
                <Suspense fallback={null}>
                  {isLandingVisible && (
                    <ThreeScene
                      isVisible={true}
                      maxConnectionsPerPoint={maxConnectionsPerPoint}
                      count={count}
                      beamSpeed={beamSpeed}
                      onCreated={!isLoaded ? () => {} : () => {}}
                    />
                  )}
                </Suspense>
              </Canvas>
            )}
          </motion.div>

          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center space-y-8 px-4 max-w-4xl mx-auto">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-8xl font-extrabold text-white tracking-tight">
                  <div className="bg-clip-text space-x-5 md:flex-row flex-col flex text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                    <span>Hello,</span>
                    <span>I'm Anmol</span>
                  </div>
                </h1>
                <div className="text-[90%] md:text-3xl text-white/90 font-light">
                  <span className="inline-block">
                    <span className="inline-block">Full-Stack Developer</span>
                    <span className="inline-block mx-2">•</span>
                    <span className="inline-block">Digital Craftsman</span>
                  </span>
                </div>
              </div>

              <div className="flex gap-6 justify-center">
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
              </div>
            </div>
          </div>

          {/* Navigation */}
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
                {["About", "Skills", "Projects", "Contact"].map(
                  (item, index) => (
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
                  )
                )}
              </motion.div>
            </div>
          </nav>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute bottom-8 left-8 z-20 hidden md:flex flex-col gap-4"
          >
            {[
              {
                href: "https://github.com/aka-shinu",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                ),
              },
              {
                href: "https://www.linkedin.com/in/aka-shinu/",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                ),
              },
            ].map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className="relative">
                  {link.icon}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </section>

        <Suspense
          fallback={
            <div className="min-h-screen bg-secondary-900 dark:bg-secondary-900" />
          }
        >
          <About />
        </Suspense>

        <Suspense
          fallback={
            <div className="min-h-screen bg-secondary-900 dark:bg-secondary-900" />
          }
        >
          <Skills />
        </Suspense>

        <Suspense
          fallback={
            <div className="min-h-screen bg-secondary-900 dark:bg-secondary-900" />
          }
        >
          <Projects />
        </Suspense>

        <Suspense
          fallback={
            <div className="min-h-screen bg-secondary-900 dark:bg-secondary-900" />
          }
        >
          <Contact />
        </Suspense>

        <Suspense
          fallback={
            <div className="min-h-screen bg-secondary-900 dark:bg-secondary-900" />
          }
        >
          <Footer />
        </Suspense>
      </div>
    </ThemeContext.Provider>
  ) : (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <BlobLoader isLoaded={isLoaded} />
      <div className="absolute inset-0 blur-custom"></div>
    </ThemeContext.Provider>
  );
}

export default App;
