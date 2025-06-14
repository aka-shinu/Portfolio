import { Canvas } from "@react-three/fiber";
import { Suspense, createContext, useState, useEffect, useRef, lazy } from "react";
import BlobLoader from "./components/BlobLoader";
import LandingHero from "./components/LandingHero";
import LandingNavigation from "./components/LandingNavigation";
import LandingSocialLinks from "./components/LandingSocialLinks";
import ThemeToggle from "./components/ThemeToggle";

const ThreeScene = lazy(() => import("./components/ThreeScene"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

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

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsLandingVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '50px' }
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
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        <section
          ref={landingRef}
          className="relative h-screen w-full overflow-hidden"
        >
          {/* Three.js Canvas */}
          <div className="absolute inset-0">
            <Canvas
              camera={{ position: [0, 0, 2], fov: 75 }}
              // onCreated={() => setIsLoaded(true)}
              dpr={[1, 1.5]}
            >
              <Suspense fallback={null}>
                {isLandingVisible && (
                  <ThreeScene
                    isVisible={true}
                    maxConnectionsPerPoint={maxConnectionsPerPoint}
                    count={count}
                    beamSpeed={beamSpeed}
                    onCreated={!isLoaded? ()=>setIsLoaded(true): ()=>{}}
                  />
                )}
              </Suspense>
            </Canvas>
          </div>

          <LandingHero isDarkMode={isDarkMode} />

          <LandingNavigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

          <LandingSocialLinks isDarkMode={isDarkMode} />
        </section>

        <Suspense fallback={<div className="min-h-screen bg-secondary-900 dark:bg-secondary-900" />}>
          <About />
        </Suspense>

        <Suspense fallback={<div className="min-h-screen bg-secondary-900 dark:bg-secondary-900" />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<div className="min-h-screen bg-secondary-900 dark:bg-secondary-900" />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<div className="min-h-screen bg-secondary-900 dark:bg-secondary-900" />}>
          <Contact />
        </Suspense>

        <Suspense fallback={<div className="min-h-screen bg-secondary-900 dark:bg-secondary-900" />}>
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
