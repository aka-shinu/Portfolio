// GitHub API Configuration
export const GITHUB_CONFIG = {
  // Replace with your actual GitHub username
  username: 'aka-shinu',
  
  // Number of repositories to fetch
  reposPerPage: 20,
  
  // Maximum number of projects to display
  maxProjects: 8,
  
  // GitHub API base URL
  apiBaseUrl: 'https://api.github.com',
  
  // Rate limiting - GitHub API allows 60 requests per hour for unauthenticated requests
  // For higher limits, you can add authentication
  useAuth: false,
  // If you want to use authentication, uncomment and add your GitHub token
  // token: process.env.GITHUB_TOKEN || '',
};

// Technology keywords to extract from repository topics
export const TECHNOLOGY_KEYWORDS = [
  'react', 'nextjs', 'typescript', 'javascript', 'python', 'nodejs', 
  'mongodb', 'postgresql', 'redis', 'aws', 'docker', 'graphql',
  'vue', 'angular', 'svelte', 'django', 'flask', 'express',
  'mysql', 'sqlite', 'firebase', 'heroku', 'vercel', 'netlify'
];

// Default fallback data for projects without custom metadata
export const DEFAULT_PROJECT_DATA = {
  features: ['Modern UI/UX', 'Responsive design', 'Performance optimized', 'Clean code'],
  image: 'https://placehold.co/600x400/6b7280/ffffff?text=Project',
  technologies: ['JavaScript', 'HTML', 'CSS'],
}; 