# 🌟 Anmol's Portfolio

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Live-blue?style=for-the-badge&logo=vercel)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-0.177.0-000000?style=for-the-badge&logo=three.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)

*A stunning, interactive portfolio showcasing modern web development with cosmic aesthetics*

[🌐 Live Demo](https://anmol2-0.github.io) • [📧 Contact](mailto:aka-shinu@lethrach.me) • [💼 LinkedIn](https://www.linkedin.com/in/aka-shinu/)

</div>

---

## ✨ Features

### 🎨 **Visual Excellence**
- **Interactive 3D Background** - Dynamic Three.js particle system with adaptive performance
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **Dark/Light Theme** - Seamless theme switching with persistent preferences
- **Responsive Design** - Optimized for all devices with mobile-first approach
- **Cosmic Aesthetics** - Space-themed UI with gradient effects and glass morphism

### 🚀 **Performance & UX**
- **Performance Optimization** - Adaptive rendering based on device capabilities
- **Lazy Loading** - Efficient resource loading with intersection observers
- **Accessibility** - WCAG compliant with proper ARIA labels and keyboard navigation
- **SEO Optimized** - Meta tags, structured data, and semantic HTML
- **Fast Loading** - Vite build optimization with compression

### 🔧 **Technical Features**
- **GitHub Integration** - Dynamic project fetching from GitHub API
- **Real-time Data** - Live repository statistics and project information
- **Interactive Skills Visualization** - Floating skill orbs with hover effects
- **Contact Form** - Functional contact system with validation
- **Progressive Enhancement** - Graceful degradation for older browsers

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **React Icons** - Comprehensive icon library

### **3D & Graphics**
- **Three.js** - 3D graphics and animations
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **Vanta.js** - Animated background effects

### **Development Tools**
- **Vite** - Fast build tool and dev server
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing
- **Terser** - JavaScript minification

### **Performance & Optimization**
- **Vite Plugin Compression** - Asset compression
- **Critical CSS** - Above-the-fold optimization
- **Intersection Observer** - Efficient scroll-based animations

---

## 🎯 Key Sections

### **Hero Section**
- Interactive 3D particle background
- Animated text with staggered reveals
- Performance-adaptive rendering
- Smooth scroll navigation

### **About Me**
- Professional introduction
- Mission statement
- Core values display
- Animated image with hover effects

### **Skills Showcase**
- **Frontend**: React, TypeScript, Next.js, Tailwind CSS
- **Backend**: Node.js, Express, Python, Django
- **Database**: MongoDB, PostgreSQL, Redis
- **DevOps**: Docker, AWS, Git, Jest
- Interactive floating skill orbs with proficiency indicators

### **Projects Gallery**
- Dynamic GitHub integration
- Real-time repository data
- Technology stack visualization
- Live demo links
- Star and fork statistics

### **Contact Section**
- Functional contact form
- Social media links
- Professional email integration
- Responsive design

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git

### **Installation**

```bash
# Clone the repository
git clone https://github.com/anmol2-0/anmol2-0.github.io.git
cd anmol2-0.github.io

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### **Environment Setup**

Create a `.env.local` file in the root directory:

```env
VITE_GITHUB_USERNAME=your-github-username
VITE_GITHUB_TOKEN=your-github-token
```

---

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── About.tsx       # About section
│   ├── Skills.tsx      # Skills visualization
│   ├── Projects.tsx    # Projects gallery
│   ├── Contact.tsx     # Contact form
│   ├── Footer.tsx      # Footer component
│   ├── ThreeScene.tsx  # 3D background
│   └── BlobLoader.tsx  # Loading animation
├── config/             # Configuration files
├── context/            # React context
├── assets/             # Static assets
└── App.tsx            # Main application
```

---

## 🎨 Design System

### **Color Palette**
- **Primary**: Blue gradients (#3B82F6 to #06B6D4)
- **Secondary**: Dark grays (#1F2937 to #374151)
- **Accent**: Cyan and purple highlights
- **Background**: Dark theme with glass morphism effects

### **Typography**
- **Headings**: Inter Tight (variable font)
- **Body**: Inter (clean, readable)
- **Accents**: Instrument Serif (elegant serif)

### **Animations**
- **Entrance**: Staggered fade-in animations
- **Hover**: Smooth scale and color transitions
- **Scroll**: Intersection-based reveals
- **3D**: Interactive particle systems

---

## 🔧 Configuration

### **GitHub Integration**
The portfolio automatically fetches your GitHub repositories. Configure in `src/config/github.ts`:

```typescript
export const GITHUB_CONFIG = {
  username: 'your-github-username',
  apiBaseUrl: 'https://api.github.com',
  reposPerPage: 12,
  maxProjects: 6
};
```

### **Performance Settings**
Adaptive performance based on device capabilities:

```typescript
// High-end devices: 1500 particles, 5 connections
// Medium devices: 600 particles, 4 connections  
// Low-end devices: 500 particles, 2 connections
```

---

## 🌟 Performance Metrics

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Anmol** - [aka-shinu@lethrach.me](mailto:aka-shinu@lethrach.me)

**Project Link**: [https://github.com/anmol2-0/anmol2-0.github.io](https://github.com/anmol2-0/anmol2-0.github.io)

**Live Demo**: [https://anmol2-0.github.io](https://anmol2-0.github.io)

---

<div align="center">

### ⭐ If you found this portfolio helpful, please give it a star!

[![GitHub stars](https://img.shields.io/github/stars/anmol2-0/anmol2-0.github.io?style=social)](https://github.com/anmol2-0/anmol2-0.github.io/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/anmol2-0/anmol2-0.github.io?style=social)](https://github.com/anmol2-0/anmol2-0.github.io/network)

---

*Built with ❤️ using React, Three.js, and Tailwind CSS*

</div>
