import { motion } from "framer-motion";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../App";
import {
  GITHUB_CONFIG,
  TECHNOLOGY_KEYWORDS,
  DEFAULT_PROJECT_DATA,
} from "../config/github";

const REPOSITORY_METADATA: Record<
  string,
  {
    features: string[];
    image: string;
    liveUrl?: string;
    priority: number; // Higher number = higher priority for display
  }
> = {
  "e-commerce-platform": {
    features: [
      "Real-time inventory",
      "Secure payments",
      "User authentication",
      "Admin dashboard",
    ],
    image:
      "https://placehold.co/600x400/3b82f6/ffffff?text=E-Commerce+Platform",
    liveUrl: "https://your-ecommerce-demo.com",
    priority: 10,
  },
  "task-management-app": {
    features: [
      "Real-time updates",
      "Team collaboration",
      "Task assignments",
      "Progress tracking",
    ],
    image: "https://placehold.co/600x400/10b981/ffffff?text=Task+Management",
    liveUrl: "https://your-task-app-demo.com",
    priority: 9,
  },
  "ai-analytics-dashboard": {
    features: [
      "AI insights",
      "Data visualization",
      "Custom reports",
      "Real-time analytics",
    ],
    image: "https://placehold.co/600x400/8b5cf6/ffffff?text=AI+Analytics",
    liveUrl: "https://your-analytics-demo.com",
    priority: 8,
  },
  "social-media-platform": {
    features: [
      "Real-time chat",
      "Content sharing",
      "User profiles",
      "Activity feed",
    ],
    image: "https://placehold.co/600x400/f59e0b/ffffff?text=Social+Media",
    liveUrl: "https://your-social-demo.com",
    priority: 7,
  },
};

// Default fallback data

interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  fork: boolean;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  features: string[];
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
  priority: number;
}

export default function Projects() {
  const { isDarkMode } = useContext(ThemeContext);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    fetchGitHubProjects();
  }, []);

  const fetchGitHubProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${GITHUB_CONFIG.apiBaseUrl}/users/${GITHUB_CONFIG.username}/repos?sort=updated&per_page=${GITHUB_CONFIG.reposPerPage}`
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const repos: GitHubRepository[] = await response.json();

      const transformedProjects = repos
        .filter((repo) => !repo.fork && repo.description)
        .filter((repo) => {
          const description = repo.description!.toLowerCase(); // Safe to use ! since we filtered nulls above
          if (description.length < 100) {
            return false;
          }
          const repoName = repo.name.toLowerCase();
          const excludedNames = ["aka-shinu", "aka shinu"];

          return !excludedNames.some((excludedName) =>
            repoName.includes(excludedName)
          );
        })
        .map((repo) => {
          const repoKey = repo.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
          const metadata = REPOSITORY_METADATA[repoKey];

          const technologies = [
            repo.language,
            ...repo.topics.filter((topic) =>
              TECHNOLOGY_KEYWORDS.includes(topic.toLowerCase())
            ),
          ].filter(Boolean) as string[];

          return {
            id: repo.id,
            title: repo.name
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()),
            description:
              repo.description ||
              "A well-crafted project showcasing modern development practices.",
            image: metadata?.image || DEFAULT_PROJECT_DATA.image,
            technologies:
              technologies.length > 0
                ? technologies
                : DEFAULT_PROJECT_DATA.technologies,
            liveUrl: metadata?.liveUrl || repo.homepage || "#",
            githubUrl: repo.html_url,
            features: metadata?.features || DEFAULT_PROJECT_DATA.features,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            topics: repo.topics,
            updatedAt: repo.updated_at,
            priority: metadata?.priority || 0,
          };
        })
        .sort((a, b) => b.priority - a.priority) // Sort by priority, then by stars
        .sort((a, b) => b.stars - a.stars)
        .slice(0, GITHUB_CONFIG.maxProjects); // Limit to configured number of projects

      setProjects(transformedProjects);
    } catch (err) {
      console.error("Error fetching GitHub projects:", err);
      setError("Failed to load projects. Please try again later.");

      // Fallback to static projects if API fails
      setProjects(getFallbackProjects());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackProjects = (): Project[] => {
    return [
      {
        id: 1,
        title: "E-Commerce Platform",
        description:
          "A full-stack e-commerce platform with real-time inventory management and secure payment processing.",
        image:
          "https://placehold.co/600x400/3b82f6/ffffff?text=E-Commerce+Platform",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        liveUrl: "#",
        githubUrl: "#",
        features: [
          "Real-time inventory",
          "Secure payments",
          "User authentication",
          "Admin dashboard",
        ],
        stars: 0,
        forks: 0,
        topics: [],
        updatedAt: new Date().toISOString(),
        priority: 0,
      },
      {
        id: 2,
        title: "Task Management App",
        description:
          "A collaborative task management application with real-time updates and team collaboration features.",
        image:
          "https://placehold.co/600x400/10b981/ffffff?text=Task+Management",
        technologies: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
        liveUrl: "#",
        githubUrl: "#",
        features: [
          "Real-time updates",
          "Team collaboration",
          "Task assignments",
          "Progress tracking",
        ],
        stars: 0,
        forks: 0,
        topics: [],
        updatedAt: new Date().toISOString(),
        priority: 0,
      },
    ];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const toggleDescription = (projectId: number) => {
    setExpandedDescriptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const truncateDescription = (
    description: string,
    maxLength: number = 120
  ) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trim() + "...";
  };

  if (loading) {
    return (
      <section
        id="projects"
        className={`section ${isDarkMode ? "bg-secondary-900" : "bg-white"}`}
      >
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p
              className={`text-lg ${
                isDarkMode ? "text-secondary-300" : "text-secondary-600"
              }`}
            >
              Loading projects...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className={`section ${isDarkMode ? "bg-secondary-900" : "bg-white"}`}
    >
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className={`text-4xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-secondary-900"
            }`}
          >
            My Projects
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-secondary-300" : "text-secondary-600"
            }`}
          >
            A showcase of my recent work and personal projects, demonstrating my
            skills and passion for creating impactful solutions.
          </p>
          {error && (
            <p
              className={`text-sm mt-2 ${
                isDarkMode ? "text-red-400" : "text-red-600"
              }`}
            >
              {error}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`group rounded-xl overflow-hidden ${
                isDarkMode ? "bg-secondary-800" : "bg-white"
              } shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                    <span>⭐</span>
                    <span>{project.stars}</span>
                  </div>
                  <div className="bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                    <span>🔀</span>
                    <span>{project.forks}</span>
                  </div>
                </div>
              </div>

              <div className="aspect-1/2  p-5">
                <h3
                  className={`text-2xl pt-2 font-semibold mb-2 ${
                    isDarkMode ? "text-white" : "text-secondary-900"
                  }`}
                >
                  {project.title}
                </h3>
                <div className="mb-4">
                  <p
                    className={`${
                      isDarkMode ? "text-secondary-300" : "text-secondary-600"
                    }`}
                  >
                    {expandedDescriptions.has(project.id)
                      ? project.description
                      : truncateDescription(project.description)}
                  </p>
                  {project.description.length > 120 && (
                    <div className="mt-2">
                      {expandedDescriptions.has(project.id) ? (
                        <button
                          onClick={() => toggleDescription(project.id)}
                          className={`text-sm font-medium hover:underline ${
                            isDarkMode
                              ? "text-primary-400 hover:text-primary-300"
                              : "text-primary-600 hover:text-primary-700"
                          }`}
                        >
                          Read Less
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleDescription(project.id)}
                            className={`text-sm font-medium hover:underline ${
                              isDarkMode
                                ? "text-primary-400 hover:text-primary-300"
                                : "text-primary-600 hover:text-primary-700"
                            }`}
                          >
                            Read More
                          </button>
                          <span
                            className={`text-sm ${
                              isDarkMode
                                ? "text-secondary-400"
                                : "text-secondary-500"
                            }`}
                          >
                            or
                          </span>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm font-medium hover:underline ${
                              isDarkMode
                                ? "text-primary-400 hover:text-primary-300"
                                : "text-primary-600 hover:text-primary-700"
                            }`}
                          >
                            View on GitHub
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <h4
                    className={`text-sm font-semibold mb-2 ${
                      isDarkMode ? "text-secondary-400" : "text-secondary-500"
                    }`}
                  >
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-center gap-2 text-sm ${
                          isDarkMode
                            ? "text-secondary-300"
                            : "text-secondary-600"
                        }`}
                      >
                        <span className="text-primary-500">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-sm ${
                        isDarkMode
                          ? "bg-primary-900/50 text-primary-300"
                          : "bg-primary-50 text-primary-600"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn flex-1 text-center ${
                      project.liveUrl !== "#"
                        ? "btn-primary"
                        : "btn-secondary opacity-50 cursor-not-allowed"
                    }`}
                    onClick={(e) => {
                      if (project.liveUrl === "#") {
                        e.preventDefault();
                      }
                    }}
                    title={
                      project.liveUrl === "#"
                        ? "Live demo not available"
                        : "View live demo"
                    }
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary flex-1 text-center"
                  >
                    View Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
