import { motion, AnimatePresence } from 'framer-motion';
import { useState, useContext } from 'react';
import { ThemeContext } from '../App';

export default function Contact() {
  const { isDarkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      const mailtoLink = `mailto:your@email.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `${formData.message}`
      )}`;
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      window.location.href = mailtoLink
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const slideDownVariants = {
    hidden: { height: 0, opacity: 0, overflow: 'hidden' },
    visible: { height: 'auto', opacity: 1, overflow: 'visible', transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
    exit: { height: 0, opacity: 0, overflow: 'hidden', transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  };
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const mailtoLink = `mailto:your@email.com?subject=${encodeURIComponent(
  //     formData.subject
  //   )}&body=${encodeURIComponent(
  //     `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
  //   )}`;

  //   window.location.href = mailtoLink;
  // };
  return (
    <section id="contact" className={`section ${isDarkMode ? 'bg-secondary-900' : 'bg-secondary-50'}`}>
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16 flex flex-col items-center justify-center relative"
        >
          <div className="flex items-center justify-center gap-4">
            <h2 className={`text-2xl whitespace-nowrap md:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}
              style={{ marginBottom: 0 }}
            >
              Let's Work Together
            </h2>
            <button
              aria-label="Show contact details"
              onClick={() => setShowDetails(true)}
              className={`ml-4 p-3 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                isDarkMode ? 'bg-primary-700 hover:bg-primary-600' : 'bg-primary-100 hover:bg-primary-200'
              }`}
              style={{ marginBottom: '1.5rem' }}
              disabled={showDetails}
            >
              <motion.svg
                initial={{ rotate: 0 }}
                animate={showDetails ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
                className="md:w-7 md:h-7 w-5 h-5 text-primary-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </button>
          </div>
          <p className={`text-sm md:text-xl max-w-3xl mx-auto leading-relaxed ${isDarkMode ? 'text-secondary-300' : 'text-secondary-600'}`}
            style={{ marginTop: 0 }}
          >
            Have a project in mind or want to discuss potential opportunities?
            I'd love to hear from you and explore how we can bring your ideas to life.
          </p>
        </motion.div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              key="contact-details"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={slideDownVariants}
              className="overflow-hidden"
            >
              <div className="grid lg:grid-cols-2 gap-16">
                {/* Contact Form */}
                <motion.div
                  variants={itemVariants}
                  className={`rounded-2xl p-8 ${
                    isDarkMode ? 'bg-secondary-800' : 'bg-white'
                  } shadow-lg border ${isDarkMode ? 'border-secondary-700' : 'border-secondary-200'}`}
                >
                  <h3 className={`text-2xl font-semibold mb-8 ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
                    Send a Message
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                          className={`block text-sm font-medium mb-3 ${
                          isDarkMode ? 'text-secondary-300' : 'text-secondary-700'
                        }`}
                      >
                          Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                          isDarkMode
                              ? 'bg-secondary-700 border-secondary-600 text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
                              : 'bg-white border-secondary-200 text-secondary-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
                          } focus:outline-none`}
                          placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                          className={`block text-sm font-medium mb-3 ${
                          isDarkMode ? 'text-secondary-300' : 'text-secondary-700'
                        }`}
                      >
                          Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                          isDarkMode
                              ? 'bg-secondary-700 border-secondary-600 text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
                              : 'bg-white border-secondary-200 text-secondary-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
                          } focus:outline-none`}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className={`block text-sm font-medium mb-3 ${
                          isDarkMode ? 'text-secondary-300' : 'text-secondary-700'
                        }`}
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                          isDarkMode
                            ? 'bg-secondary-700 border-secondary-600 text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
                            : 'bg-white border-secondary-200 text-secondary-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
                        } focus:outline-none`}
                        placeholder="Project Inquiry"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className={`block text-sm font-medium mb-3 ${
                          isDarkMode ? 'text-secondary-300' : 'text-secondary-700'
                        }`}
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 resize-none ${
                          isDarkMode
                            ? 'bg-secondary-700 border-secondary-600 text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
                            : 'bg-white border-secondary-200 text-secondary-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
                        } focus:outline-none`}
                        placeholder="Tell me about your project..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      // onSubmit={()=>{setIsSubmitting(true)}}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                        isSubmitting 
                          ? 'opacity-75 cursor-not-allowed' 
                          : 'hover:scale-105 hover:shadow-lg'
                      } ${
                        isDarkMode
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-primary-600 text-white hover:bg-primary-700'
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Message...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </button>

                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-center"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Message sent successfully! I'll get back to you within 24 hours.
                        </div>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-center"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          Oops! Something went wrong. Please try again or contact me directly.
                        </div>
                      </motion.div>
                    )}
                  </form>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="space-y-12"
                >
                  <div>
                    <h3 className={`text-3xl font-semibold mb-8 ${
                      isDarkMode ? 'text-white' : 'text-secondary-900'
                    }`}>
                      Get In Touch
                    </h3>
                    <div className="space-y-6">
                      <div className={`flex items-start gap-4 p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                        isDarkMode ? 'bg-secondary-800' : 'bg-white'
                      } shadow-sm`}>
                        <div className={`p-3 rounded-full ${isDarkMode ? 'bg-primary-900/50' : 'bg-primary-50'}`}>
                          <svg
                            className="w-6 h-6 text-primary-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        </div>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
                            Email
                          </h4>
                          <a 
                            href="mailto:aka-shinu@lethrach.me" 
                            className={`hover:text-primary-500 transition-colors ${
                              isDarkMode ? 'text-secondary-300' : 'text-secondary-600'
                            }`}
                          >
                          aka-shinu@lethrach.me
                        </a>
                        </div>
                      </div>

                      <div className={`flex items-start gap-4 p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                        isDarkMode ? 'bg-secondary-800' : 'bg-white'
                      } shadow-sm`}>
                        <div className={`p-3 rounded-full ${isDarkMode ? 'bg-primary-900/50' : 'bg-primary-50'}`}>
                          <svg
                            className="w-6 h-6 text-primary-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        </div>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
                            Phone
                          </h4>
                          <a 
                            href="tel:+1234567890" 
                            className={`hover:text-primary-500 transition-colors ${
                              isDarkMode ? 'text-secondary-300' : 'text-secondary-600'
                            }`}
                          >
                          +1 (234) 567-890
                        </a>
                        </div>
                      </div>

                      <div className={`flex items-start gap-4 p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                        isDarkMode ? 'bg-secondary-800' : 'bg-white'
                      } shadow-sm`}>
                        <div className={`p-3 rounded-full ${isDarkMode ? 'bg-primary-900/50' : 'bg-primary-50'}`}>
                          <svg
                            className="w-6 h-6 text-primary-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        </div>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
                            Location
                          </h4>
                          <span className={`${isDarkMode ? 'text-secondary-300' : 'text-secondary-600'}`}>
                            Your Location, City, Country
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-2xl font-semibold mb-6 ${
                      isDarkMode ? 'text-white' : 'text-secondary-900'
                    }`}>
                      Connect With Me
                    </h3>
                    <div className="flex gap-4">
                      {[
                        {
                          name: 'GitHub',
                          href: 'https://github.com/aka-shinu',
                          icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                          ),
                        },
                        {
                          name: 'LinkedIn',
                          href: 'https://www.linkedin.com/in/aka-shinu/',
                          icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                          ),
                        },
                        {
                          name: 'Twitter',
                          href: 'https://twitter.com/yourusername',
                          icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                          ),
                        },
                      ].map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-4 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                            isDarkMode
                              ? 'bg-secondary-800 text-secondary-300 hover:bg-secondary-700 hover:text-white'
                              : 'bg-white text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                          } shadow-sm`}
                          title={social.name}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-secondary-800' : 'bg-white'} shadow-sm`}>
                    <h4 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
                      Availability
                    </h4>
                    <p className={`${isDarkMode ? 'text-secondary-300' : 'text-secondary-600'}`}>
                      I'm currently available for freelance work and full-time opportunities. 
                      Let's discuss your project and see how I can help bring your vision to life.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
} 