# GitHub API Integration for Projects

This implementation fetches your GitHub repositories and displays them as projects on your portfolio website. It combines GitHub API data with custom metadata for features and images.

## Features

- **Dynamic Repository Fetching**: Automatically fetches your latest GitHub repositories
- **Custom Metadata**: Add specific features, images, and live demo URLs for important projects
- **Technology Detection**: Automatically extracts technologies from repository topics and language
- **Fallback System**: Gracefully handles API errors with static fallback projects
- **GitHub Stats**: Displays star and fork counts for each project
- **Priority Sorting**: Custom priority system to control project display order

## Setup Instructions

### 1. Configure GitHub Username

Edit `src/config/github.ts` and replace `'your-github-username'` with your actual GitHub username:

```typescript
export const GITHUB_CONFIG = {
  username: 'your-actual-github-username', // Replace this
  // ... other config
};
```

### 2. Add Custom Metadata for Important Projects

In `src/components/Projects.tsx`, add entries to the `REPOSITORY_METADATA` object for repositories you want to highlight:

```typescript
const REPOSITORY_METADATA: Record<string, {
  features: string[];
  image: string;
  liveUrl?: string;
  priority: number;
}> = {
  'your-repo-name': {
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    image: 'https://your-custom-image-url.com/image.jpg',
    liveUrl: 'https://your-live-demo.com',
    priority: 10, // Higher number = higher priority
  },
  // Add more repositories...
};
```

**Repository Key Format**: Convert your repository name to lowercase and replace special characters with hyphens:
- `My-Awesome-Project` → `my-awesome-project`
- `react_portfolio` → `react-portfolio`

### 3. Custom Images

You can use:
- **Custom URLs**: `https://your-domain.com/project-image.jpg`
- **Placeholder Images**: `https://placehold.co/600x400/color/ffffff?text=Project+Name`
- **GitHub Screenshots**: Take screenshots of your projects and host them

### 4. Live Demo URLs

Add live demo URLs for projects that are deployed:
- Vercel: `https://your-project.vercel.app`
- Netlify: `https://your-project.netlify.app`
- Custom domain: `https://your-project.com`

## How It Works

### Data Flow

1. **GitHub API Call**: Fetches repositories from your GitHub account
2. **Repository Filtering**: Excludes forks and repositories without descriptions
3. **Metadata Matching**: Looks for custom metadata using repository name
4. **Technology Extraction**: Extracts technologies from repository topics and language
5. **Data Transformation**: Combines GitHub data with custom metadata
6. **Sorting**: Sorts by custom priority, then by GitHub stars
7. **Display**: Renders projects with fallback to static data if API fails

### Fallback System

If the GitHub API fails or returns an error:
- Shows an error message to users
- Falls back to static project data
- Ensures the website always displays projects

### Technology Detection

The system automatically detects technologies from:
- Repository language (e.g., "JavaScript", "Python")
- Repository topics (e.g., "react", "typescript", "mongodb")

Supported technology keywords are defined in `src/config/github.ts`.

## Customization Options

### Modify Technology Keywords

Edit `TECHNOLOGY_KEYWORDS` in `src/config/github.ts`:

```typescript
export const TECHNOLOGY_KEYWORDS = [
  'react', 'nextjs', 'typescript', 'javascript', 'python', 'nodejs', 
  // Add your preferred technologies...
];
```

### Change Default Project Data

Modify `DEFAULT_PROJECT_DATA` in `src/config/github.ts`:

```typescript
export const DEFAULT_PROJECT_DATA = {
  features: ['Your default features...'],
  image: 'https://your-default-image.com',
  technologies: ['Your default tech stack...'],
};
```

### Adjust API Settings

Modify `GITHUB_CONFIG` in `src/config/github.ts`:

```typescript
export const GITHUB_CONFIG = {
  username: 'your-username',
  reposPerPage: 30, // Fetch more repositories
  maxProjects: 12,  // Display more projects
  // ... other settings
};
```

## Rate Limiting

- **Unauthenticated**: 60 requests per hour
- **Authenticated**: 5,000 requests per hour

For higher limits, you can add GitHub authentication by:
1. Creating a GitHub Personal Access Token
2. Adding it to your environment variables
3. Uncommenting the token configuration in `github.ts`

## Troubleshooting

### Common Issues

1. **"Failed to load projects" error**
   - Check your GitHub username in the config
   - Verify your GitHub account is public
   - Check browser console for detailed error messages

2. **No projects showing**
   - Ensure your repositories have descriptions
   - Check that repositories aren't forks
   - Verify the API response in browser network tab

3. **Custom metadata not working**
   - Check repository key format (lowercase, hyphens)
   - Verify the repository name matches exactly
   - Check browser console for any errors

### Debug Mode

Add console logging to debug issues:

```typescript
const fetchGitHubProjects = async () => {
  try {
    console.log('Fetching repositories for:', GITHUB_CONFIG.username);
    // ... existing code
    console.log('Fetched repositories:', repos);
    // ... rest of the code
  } catch (err) {
    console.error('Detailed error:', err);
    // ... error handling
  }
};
```

## Best Practices

1. **Repository Descriptions**: Write clear, descriptive README files for your repositories
2. **Topics**: Add relevant topics to your GitHub repositories for better technology detection
3. **Images**: Use high-quality screenshots or custom images for important projects
4. **Live Demos**: Deploy your best projects and add live demo URLs
5. **Priority**: Set higher priority for your most impressive projects

## Security Notes

- Never commit GitHub tokens to version control
- Use environment variables for sensitive data
- The current implementation uses public GitHub API (no authentication required)
- Consider rate limiting for production use 