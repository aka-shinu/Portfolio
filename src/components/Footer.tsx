export default function Footer() {
  return (
    <footer className="w-full bg-black/30 py-8 !pt-20 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 gap-y-8">
        <div>
          <h2 className="text-white font-semibold text-xl font-heading mb-2 tracking-tight">Anmol</h2>
          <p className="text-gray-300 font-sans text-base mb-4 leading-snug">
            Full-stack developer passionate about creating innovative web solutions.
          </p>
          <div className="flex gap-3 items-center mt-1">
            <a
              href="https://github.com/aka-shinu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-300 transition-colors duration-200 p-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center hover:drop-shadow-[0_2px_8px_rgba(59,130,246,0.15)]"
              aria-label="GitHub"
            >
              <i className="devicon-github-original text-lg align-middle" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/aka-shinu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-300 transition-colors duration-200 p-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center hover:drop-shadow-[0_2px_8px_rgba(59,130,246,0.15)]"
              aria-label="LinkedIn"
            >
              <i className="devicon-linkedin-plain text-lg align-middle" aria-hidden="true"></i>
            </a>
            <a
              href="mailto:aka-shinu@lethrach.me"
              className="text-white hover:text-blue-300 transition-colors duration-200 p-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center hover:drop-shadow-[0_2px_8px_rgba(59,130,246,0.15)]"
              aria-label="Email"
            >
              <svg className="w-5 h-5 align-middle" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg font-heading mb-3 tracking-tight">Navigation</h3>
          <ul className="space-y-2">
            {[
              { href: '#about', label: 'About' },
              { href: '#skills', label: 'Skills' },
              { href: '#projects', label: 'Projects' },
              { href: '#contact', label: 'Contact' },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-white font-sans text-base hover:text-blue-300 hover:underline transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg font-heading mb-3 tracking-tight">Contact</h3>
          <ul className="space-y-1 mb-4">
            <li>
              <span className="text-gray-300 font-sans text-base">aka-shinu@lethrach.me</span>
            </li>
            <li>
              <span className="text-gray-300 font-sans text-base">Available for new opportunities</span>
            </li>
          </ul>
          <h4 className="text-white font-semibold text-base font-heading mb-2">Connect</h4>
          <div className="flex gap-3 items-center">
            <a
              href="https://github.com/aka-shinu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-300 transition-colors duration-200 p-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center hover:drop-shadow-[0_2px_8px_rgba(59,130,246,0.15)]"
              aria-label="GitHub"
            >
              <i className="devicon-github-original text-base align-middle" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/aka-shinu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-300 transition-colors duration-200 p-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center hover:drop-shadow-[0_2px_8px_rgba(59,130,246,0.15)]"
              aria-label="LinkedIn"
            >
              <i className="devicon-linkedin-plain text-base align-middle" aria-hidden="true"></i>
            </a>
            <a
              href="mailto:aka-shinu@lethrach.me"
              className="text-white hover:text-blue-300 transition-colors duration-200 p-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center hover:drop-shadow-[0_2px_8px_rgba(59,130,246,0.15)]"
              aria-label="Email"
            >
              <svg className="w-5 h-5 align-middle" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-5 text-center">
        <p className="text-gray-400 text-sm font-sans mb-1 tracking-tight">
          © {new Date().getFullYear()} Anmol. All rights reserved.
        </p>
        <p className="text-gray-500 text-xs font-sans tracking-tight">
          Built with React, Three.js, and Tailwind CSS
        </p>
      </div>
    </footer>
  );
} 