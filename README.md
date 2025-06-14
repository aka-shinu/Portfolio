
# 🚀 Anmol's Cosmic Portfolio

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Live-blue?style=for-the-badge&logo=vercel)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-0.177.0-000000?style=for-the-badge&logo=three.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)

*Hey there! Welcome to my digital space—a stunning, interactive portfolio that shows off modern web development with a cool cosmic vibe.*

[🌐 See it in Action!](https://anmol2-0.github.io) • [📧 Let's Chat!](mailto:aka-shinu@lethrach.me) • [💼 Connect on LinkedIn](https://www.linkedin.com/in/aka-shinu/)

</div>

---

## ✨ What Makes This Portfolio Shine?

This isn't just a static resume; it's an experience! I've poured a lot of effort into making it visually captivating, super fast, and packed with cool tech.

### 🎨 **A Treat for Your Eyes**
- **Interactive 3D Background**: Dive into a dynamic, starry particle system that actually adjusts to your device for the smoothest experience.
- **Buttery Smooth Animations**: Every transition and tiny interaction feels fluid, thanks to **Framer Motion**.
- **Day or Night Mode**: Seamlessly switch between dark and light themes, and your preference sticks around for next time!
- **Looks Great Everywhere**: Whether you're on your phone, tablet, or desktop, this site adapts beautifully.
- **Cosmic Vibes**: Expect a space-themed journey with vibrant gradients and trendy glass-morphism effects.

### 🚀 **Built for Speed & You**
- **Optimized Performance**: This portfolio is smart! It renders adaptively based on your device, ensuring a snappier experience.
- **Smart Loading**: Content loads efficiently as you scroll, so you're not waiting around.
- **Accessible for All**: Designed with everyone in mind, featuring proper labels and keyboard navigation.
- **Search Engine Friendly**: I've optimized it to help more people discover my work online.
- **Loads in a Flash**: Thanks to **Vite** and smart compression, this site is super quick!

### 🔧 **Cool Technical Touches**
- **Live GitHub Projects**: See my latest projects pulled straight from GitHub, complete with real-time stats!
- **Dynamic Data**: Get live updates on repository stars and project info.
- **Interactive Skills**: My skills aren't just listed; they're **floating orbs** you can interact with!
- **Working Contact Form**: Easily send me a message through a fully functional form with built-in validation.
- **Progressive Enhancement**: It works well even on older browsers, gracefully adapting if needed.

---

## 🛠️ The Tech That Powers This Universe

Curious about what makes it all tick? Here's the awesome tech stack I used:

### **Frontend Fun**
- **React 19**: The latest and greatest from React for a dynamic and modern user interface.
- **TypeScript**: Keeps the code robust and helps avoid pesky errors.
- **Tailwind CSS**: My secret weapon for building beautiful, responsive designs super fast.
- **Framer Motion**: The magic behind all those delightful animations.
- **React Icons**: A massive collection of icons to make everything look crisp.

### **Bringing 3D to Life**
- **Three.js**: The powerful library that handles all the stunning 3D graphics and animations.
- **React Three Fiber & Drei**: These make integrating complex Three.js scenes into React a breeze.
- **Vanta.js**: Used for the captivating animated background effects.

### **Development Toolkit**
- **Vite**: My go-to for a lightning-fast development server and build process.
- **ESLint**: Helps maintain high code quality.
- **PostCSS**: For processing and optimizing CSS.
- **Terser**: Minifies JavaScript to keep things lean and fast.

### **Performance Enhancers**
- **Vite Plugin Compression**: Compresses assets for quicker loading.
- **Critical CSS**: Ensures the most important styles load first for a fast initial paint.
- **Intersection Observer**: Powers efficient, scroll-based animations.

---

## 🎯 What You'll Find Inside

Take a journey through the key sections of my portfolio:

### **Hero Section**
Your grand entrance! Experience the mesmerizing interactive 3D background and watch animated text gracefully reveal itself.

### **About Me**
Get to know the person behind the code. I share my professional journey, mission, and core values here, along with an animated image that responds to your hover.

### **Skills Showcase**
See my technical abilities come to life! Explore my expertise in **Frontend** (React, TypeScript, Next.js, Tailwind CSS), **Backend** (Node.js, Express, Python, Django), **Database** (MongoDB, PostgreSQL, Redis), and **DevOps** (Docker, AWS, Git, Jest) through interactive, floating skill orbs.

### **Projects Gallery**
My favorite part! This section dynamically pulls my latest projects directly from GitHub, showing off **real-time stats**, the technologies I used, live demos, and even star and fork counts.

### **Contact Section**
Ready to connect? Use the straightforward contact form, find my social media links, or shoot me an email.

---

## 🚀 Ready to Get Started? (For Devs!)

Want to run this portfolio on your own machine or customize it? Here's how:

### **What You'll Need**
- Node.js (version 18 or newer)
- npm or yarn
- Git

### **Installation**

```bash
# First, clone this repository to your computer
git clone [https://github.com/aka-shinu/Portfolio.git](https://github.com/aka-shinu/Portfolio.git)
cd anmol2-0.github.io

# Install all the project dependencies
npm install

# Start the development server and see it live!
npm run dev

# When you're ready for prime time, build the production-ready version
npm run build

# You can also preview that optimized production build locally
npm run preview
````

### **Quick Environment Setup**

To make the "Projects" section shine with your own GitHub data, create a file named `.env.local` in the root directory. You can add your GitHub username and optionally set limits for the number of repos and projects displayed:

```env
VITE_GITHUB_USERNAME=your-github-username
VITE_REPO_PERPAGE=<num> # e.g., VITE_REPO_PERPAGE=12
VITE_MAX_PROJECTS=<num> # e.g., VITE_MAX_PROJECTS=6
```

-----

## 📁 How the Project is Organized

Here's a quick map of the project's structure:

```
src/
├── components/           # All the individual building blocks of the portfolio (like About, Skills, Projects)
│   ├── About.tsx         # Your personal story
│   ├── Skills.tsx        # Visualizing your expertise
│   ├── Projects.tsx      # Showcasing your creations
│   ├── Contact.tsx       # How people can reach you
│   ├── Footer.tsx        # The site's bottom section
│   ├── ThreeScene.tsx    # The core of the amazing 3D background
│   └── BlobLoader.tsx    # A cool loading animation
├── config/               # Important settings and configurations
├── context/              # For managing global state in React
├── assets/               # Images and other static files
└── App.tsx               # The main application file that ties everything together
```

-----

## 🎨 My Design Philosophy

Every visual choice in this portfolio was made with care, aiming for a cohesive and captivating user experience.

### **Color Palette**

A journey through **Primary** blue gradients that seamlessly blend into a vibrant cyan, balanced by **Secondary** dark grays for depth. **Accent** cyan and purple highlights add pops of energy, all set against a dark theme enhanced with futuristic glass morphism effects.

### **Typography**

**Inter Tight** delivers crisp, modern headings, while **Inter** provides clean and easily readable body text. For a touch of elegance, **Instrument Serif** is used for subtle accents.

### **Animations**

Animations are here to delight\! Expect **staggered fade-ins** for smooth entrances, **subtle scale and color transitions** on hover, **scroll-triggered reveals** to keep you engaged, and of course, the **interactive 3D particle systems** that give it that cosmic feel.

-----

## 🌟 Performance You'll Love

I'm really proud of how fast and fluid this portfolio is. It consistently hits top performance scores:

  - **Lighthouse Score**: Always 95+ across all crucial metrics.
  - **Lightning Quick Load Times**: First Contentful Paint in under 1.5 seconds, Largest Contentful Paint under 2.5 seconds.
  - **Super Smooth Layouts**: Minimal Cumulative Layout Shift means nothing jumps around unexpectedly.
  - **Instant Responsiveness**: First Input Delay under 100ms ensures every click and tap feels immediate.

-----

## 🤝 Want to Contribute?

I'd absolutely love for you to get involved\! If you have ideas, spot a bug, or want to add a cool new feature, please feel free to submit a Pull Request.

1.  **Fork** this repository to your own GitHub account.
2.  Create a **new branch** for your awesome changes (`git checkout -b feature/YourAwesomeIdea`).
3.  **Commit** your work (`git commit -m 'Add some AmazingFeature'`).
4.  **Push** your changes to your branch (`git push origin feature/YourAwesomeIdea`).
5.  **Open a Pull Request** and tell me all about what you've done\!

-----

## 📄 License

This project is open-source and proudly released under the **MIT License**. Feel free to use and adapt it\!

-----

## 📞 Let's Connect\!

**Anmol** - [aka-shinu@lethrach.me](mailto:aka-shinu@lethrach.me)

**Find this project on GitHub**: [https://github.com/aka-shinu/Portfolio](https://github.com/aka-shinu/Portfolio)

**Experience the live demo**: [https://lethrach.me](https://lethrach.me)

-----


### ⭐ If this portfolio sparked some inspiration, please give it a star on GitHub\!

[](https://github.com/aka-shinu/Portfolio/stargazers)
[](https://github.com/aka-shinu/Portfolio/network)

-----

*Handcrafted with ❤️ and a passion for creating impactful web experiences.*




