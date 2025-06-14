// GitHub API Configuration

export const GITHUB_CONFIG = {
  username: import.meta.env.VITE_GIT_USERNAME,
  reposPerPage: import.meta.env.VITE_REPO_PERPAGE,
  maxProjects: import.meta.env.VITE_MAX_PROJECTS,
  apiBaseUrl: 'https://api.github.com',
  useAuth: false,
  token: import.meta.env.VITE_GITHUB_TOKEN || '',
};

export const TECHNOLOGY_KEYWORDS = [
  'react', 'nextjs', 'typescript', 'javascript', 'python', 'nodejs', 
  'mongodb', 'postgresql', 'redis', 'aws', 'docker', 'graphql',
  'vue', 'angular', 'svelte', 'django', 'flask', 'express',
  'mysql', 'sqlite', 'firebase', 'heroku', 'vercel', 'netlify'
];

export const DEFAULT_PROJECT_DATA = {
  features: ['Modern UI/UX', 'Responsive design', 'Performance optimized', 'Clean code'],
  image: 'https://placehold.co/600x400/6b7280/ffffff?text=Project',
  technologies: ['JavaScript', 'HTML', 'CSS'],
}; 