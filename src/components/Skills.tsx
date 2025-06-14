import React, { useState, useEffect, useRef } from "react";

const SKILL_CATEGORIES = [
  {
    key: "frontend",
    label: "Frontend",
    accent: "#60a5fa",
    heading: "Frontend Technologies",
  },
  {
    key: "backend",
    label: "Backend",
    accent: "#34d399",
    heading: "Backend & APIs",
  },
  {
    key: "database",
    label: "Database",
    accent: "#fbbf24",
    heading: "Databases",
  },
  {
    key: "devops",
    label: "DevOps & Tools",
    accent: "#a78bfa",
    heading: "DevOps & Tools",
  },
];

type SkillCategory = (typeof SKILL_CATEGORIES)[number]["key"];
type Skill = {
  name: string;
  category: SkillCategory;
  proficiency: number;
  icon: string; // devicon class
};

const SKILLS: Skill[] = [
  {
    name: "React",
    category: "frontend",
    proficiency: 95,
    icon: "devicon-react-original",
  },
  {
    name: "Redux",
    category: "frontend",
    proficiency: 90,
    icon: "devicon-redux-original",
  },
  {
    name: "TypeScript",
    category: "frontend",
    proficiency: 92,
    icon: "devicon-typescript-plain",
  },
  {
    name: "Next.js",
    category: "frontend",
    proficiency: 85,
    icon: "devicon-nextjs-plain",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    proficiency: 90,
    icon: "devicon-tailwindcss-plain",
  },
  {
    name: "HTML5",
    category: "frontend",
    proficiency: 98,
    icon: "devicon-html5-plain",
  },
  {
    name: "CSS3",
    category: "frontend",
    proficiency: 97,
    icon: "devicon-css3-plain",
  },
  {
    name: "Node.js",
    category: "backend",
    proficiency: 93,
    icon: "devicon-nodejs-plain",
  },
  {
    name: "Express",
    category: "backend",
    proficiency: 90,
    icon: "devicon-express-original",
  },
  {
    name: "Python",
    category: "backend",
    proficiency: 88,
    icon: "devicon-python-plain",
  },
  {
    name: "Django",
    category: "backend",
    proficiency: 80,
    icon: "devicon-django-plain",
  },
  {
    name: "GraphQL",
    category: "backend",
    proficiency: 85,
    icon: "devicon-graphql-plain",
  },
  {
    name: "MongoDB",
    category: "database",
    proficiency: 87,
    icon: "devicon-mongodb-plain",
  },
  {
    name: "PostgreSQL",
    category: "database",
    proficiency: 85,
    icon: "devicon-postgresql-plain",
  },
  {
    name: "Redis",
    category: "database",
    proficiency: 80,
    icon: "devicon-redis-plain",
  },
  {
    name: "Docker",
    category: "devops",
    proficiency: 88,
    icon: "devicon-docker-plain",
  },
  {
    name: "AWS",
    category: "devops",
    proficiency: 80,
    icon: "devicon-amazonwebservices-plain-wordmark",
  },
  {
    name: "Git",
    category: "devops",
    proficiency: 95,
    icon: "devicon-git-plain",
  },
  {
    name: "Jest",
    category: "devops",
    proficiency: 85,
    icon: "devicon-jest-plain",
  },
  {
    name: "Figma",
    category: "devops",
    proficiency: 75,
    icon: "devicon-figma-plain",
  },
];

function getKNearest(nodes: { x: number; y: number }[], k: number): number[][] {
  return nodes.map((node, i) => {
    const dists = nodes.map((other, j) => ({
      idx: j,
      dist: i === j ? Infinity : Math.hypot(node.x - other.x, node.y - other.y),
    }));
    dists.sort((a, b) => a.dist - b.dist);
    return dists.slice(0, k).map((d) => d.idx);
  });
}

function useFloatingGridPositions(
  count: number,
  gridCols: number,
  gridRows: number,
  width: number,
  height: number,
  radius: number
) {
  type Pos = {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    angle: number;
    speed: number;
    amplitude: number;
    phase: number;
  };
  const [positions, setPositions] = useState<Pos[]>(() =>
    Array(count)
      .fill(0)
      .map(() => ({
        x: 0,
        y: 0,
        baseX: 0,
        baseY: 0,
        angle: 0,
        speed: 0,
        amplitude: 0,
        phase: 0,
      }))
  );
  useEffect(() => {
    // Calculate grid anchors
    const cellW = width / gridCols;
    const cellH = height / gridRows;
    const newPositions = Array(count)
      .fill(0)
      .map((_, i) => {
        const col = i % gridCols;
        const row = Math.floor(i / gridCols);
        const baseX = cellW * (col + 0.5);
        const baseY = cellH * (row + 0.5);
        return {
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          angle: Math.random() * Math.PI * 2,
          speed: 0.7 + Math.random() * 0.7,
          amplitude: radius * (0.7 + Math.random() * 0.5),
          phase: Math.random() * Math.PI * 2,
        };
      });
    setPositions(newPositions);
  }, [count, gridCols, gridRows, width, height, radius]);

  useEffect(() => {
    let running = true;
    function animate() {
      setPositions((prev) =>
        prev.map((pos) => {
          const t = performance.now() / 1000;
          return {
            ...pos,
            x: pos.baseX + Math.cos(t * pos.speed + pos.phase) * pos.amplitude,
            y: pos.baseY + Math.sin(t * pos.speed + pos.phase) * pos.amplitude,
          };
        })
      );
      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => {
      running = false;
    };
  }, []);
  return positions;
}

function SkillOrb({
  skill,
  x,
  y,
  highlight,
  dimmed,
  onHover,
  onLeave,
}: {
  skill: Skill;
  x: number;
  y: number;
  highlight: boolean;
  dimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className="absolute flex flex-col items-center group select-none"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        zIndex: 2,
        pointerEvents: "auto",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className={`md:p-2.5 md:w-19 md:h-19 h-8 w-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300
          ${highlight ? "scale-105" : ""}
          ${dimmed ? "opacity-20 grayscale" : "opacity-100"}
          md:!bg-white/80
        `}
        style={{
          // boxShadow: highlight
          //   ? `0 0 32px 8px ${skill.category === 'frontend' ? '#60a5fa99' : skill.category === 'backend' ? '#34d39999' : skill.category === 'database' ? '#fbbf2499' : '#a78bfa99'}`
          //   : '0 0 16px 2px rgba(30,41,59,0.22)',
          // filter: highlight ? '' : '',
          transition: "filter 0.3s, opacity 0.3s",
        }}
      >
        <i className={`${skill.icon} text-black text-4xl colored`} />
      </div>
      <div
        className={`text-center text-[70%] text-base font-medium mt-1 transition-all duration-300 ${
          dimmed ? "opacity-20" : "opacity-100"
        } text-white/90`}
        style={{
          fontFamily: "Inter, sans-serif",
          textShadow: "0 1px 8px #0008",
        }}
      >
        {skill.name}
      </div>
    </div>
  );
}

export default function Skills() {
  const [selectedCategory, setSelectedCategory] =
    useState<SkillCategory | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px 0px -100px 0px' 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const gridCols = 5;
  const gridRows = Math.ceil(SKILLS.length / gridCols);
  const orbRadius = 44;
  const [dimensions, setDimensions] = useState({ width: 1200, height: 900 });
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Floating positions
  const positions = useFloatingGridPositions(
    SKILLS.length,
    gridCols,
    gridRows,
    dimensions.width,
    dimensions.height,
    orbRadius
  );
  // Find neighbors for lines
  const neighbors = getKNearest(positions, 3);

  // Draw lines on canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    positions.forEach((pos, i) => {
      const skill = SKILLS[i];
      const cat = SKILL_CATEGORIES.find((c) => c.key === skill.category);
      const accent = cat ? cat.accent : "#a3a3a3";
      const highlight =
        !selectedCategory || skill.category === selectedCategory;
      const dimmed = selectedCategory && !highlight;
      neighbors[i].forEach((j) => {
        const other = positions[j];
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = highlight ? accent : "#e0e7ef33";
        ctx.globalAlpha = dimmed ? 0.1 : 0.22;
        ctx.lineWidth = 2;
        ctx.shadowColor = highlight ? accent : "#e0e7ef33";
        ctx.shadowBlur = highlight ? 12 : 0;
        ctx.stroke();
        ctx.restore();
      });
    });
  }, [positions, neighbors, selectedCategory, dimensions]);

 

  useEffect(() => {
    document.body.classList.add("dark");
  }, []);
  
  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`relative w-full min-h-[100vh] flex flex-col items-center justify-start overflow-hidden p-8 lg:p-16 transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={
        {
          // background: '\',
        }
      }
    >
      <div className={`w-full h-full space-y-9 text-center text-white text-5xl md:text-7xl capitalize flex flex-col transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <span className="inter-tight instrument-serif-regular-italic">
          What I Bring to the Table
        </span>
        <span className="text-[25%] font-light opacity-80 inter-tight">
          Outlining the diverse range of abilities and specialized knowledge I
          offer to every project.
        </span>
      </div>
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className={`absolute top-1/4 left-1/3 w-2 h-2 bg-white/10 rounded-full blur-sm animate-pulse-slow transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`} />
        <div className={`absolute top-2/3 left-2/4 w-3 h-3 bg-blue-400/10 rounded-full blur-md animate-pulse-slow transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`} />
        <div className={`absolute top-1/2 left-2/5 w-1.5 h-1.5 bg-purple-400/10 rounded-full blur-md animate-pulse-slow transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`} />
        <div className={`absolute top-1/3 left-3/4 w-2 h-2 bg-green-400/10 rounded-full blur-md animate-pulse-slow transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>
      <div className={`w-full mt-9 mb-9 flex justify-center gap-2 md:gap-6 pt-5 pb-4 md:pl-0 md:pr-0 pl-7 pr-7 z-20 transition-all duration-1000 delay-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            className={`md:px-4 md:py-2 w-fit h-fit px-2 py-1 whitespace-nowrap rounded-sm font-medium transition-all duration-200 text-[50%]  md:!text-[90%] md:text-base shadow-sm border border-gray-700 focus:outline-none ${
              selectedCategory === cat.key
                ? "bg-[#232946] text-white border-blue-400 shadow-md ring-2 ring-blue-700"
                : "bg-white text-black hover:bg-[#232946] hover:text-white"
            }`}
            style={
              selectedCategory === cat.key
                ? {
                    color: cat.accent,
                    borderColor: cat.accent,
                    fontWeight: 600,
                    boxShadow: "0 0 0 2px " + cat.accent,
                  }
                : {}
            }
            onClick={() =>
              setSelectedCategory(selectedCategory === cat.key ? null : cat.key)
            }
          >
            {cat.label}
          </button>
        ))}
        <button
          className={`md:px-4 md:py-2 w-fit h-fit px-2 py-1 whitespace-nowrap rounded-sm font-medium transition-all duration-200 text-[60%]  md:!text-[90%] md:text-base shadow-sm border border-gray-700 focus:outline-none ${
            !selectedCategory
              ? "bg-[#232946] text-white border-blue-400 shadow-md ring-2 ring-blue-700"
              : "bg-white text-black hover:bg-[#232946] hover:text-white"
          }`}
          style={!selectedCategory ? { color: "#fff", fontWeight: 600 } : {}}
          onClick={() => setSelectedCategory(null)}
        >
          View All
        </button>
      </div>
      <div
        ref={containerRef}
        className={`relative w-full flex-1 m-20 transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
        style={{ minHeight: 700, height: "calc(100vh - 8rem)" }}
      >
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
        {positions.map((pos, i) => (
          <React.Fragment key={SKILLS[i].name}>
            {/* {firstOfCategory[SKILLS[i].category] === i && (
              <div
                className="absolute text-lg font-semibold text-center tracking-wide z-10"
                style={{
                  left: pos.x,
                  top: pos.y - 70,
                  transform: 'translate(-50%, -50%)',
                  fontFamily: 'Inter, sans-serif',
                  color: '#e0e7ef',
                  textShadow: '0 2px 16px #000a',
                  pointerEvents: 'none',
                }}
              >
                {SKILL_CATEGORIES.find(c => c.key === SKILLS[i].category)?.heading}
              </div>
            )} */}
            <SkillOrb
              skill={SKILLS[i]}
              x={pos.x}
              y={pos.y}
              highlight={
                selectedCategory === null ||
                SKILLS[i].category === selectedCategory
              }
              dimmed={
                selectedCategory !== null &&
                SKILLS[i].category !== selectedCategory
              }
              onHover={() => setHoveredSkill(SKILLS[i])}
              onLeave={() => setHoveredSkill(null)}
            />
            {hoveredSkill && hoveredSkill.name === SKILLS[i].name && (
              <div
                className="absolute left-1/2 -top-8 -translate-x-1/2 z-30 pointer-events-none animate-fadein"
                style={{
                  left: pos.x,
                  top: pos.y - 70,
                  transform: "translate(-50%, -100%)",
                  background: "rgba(24,28,42,0.98)",
                  color: "#e0e7ef",
                  borderRadius: 8,
                  fontSize: 14,
                  padding: "7px 18px",
                  // boxShadow: '0 4px 24px 0 rgba(0,0,0,0.28)',
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  border: "1px solid #232946",
                  textShadow: "0 1px 8px #0008",
                }}
              >
                {SKILLS[i].name}: <b>{SKILLS[i].proficiency}% Proficiency</b>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
     
    </section>
  );
}
