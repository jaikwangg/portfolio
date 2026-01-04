"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [useOAuth2, setUseOAuth2] = useState(true); // Toggle between OAuth2 and App Password

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    // try {
    //   // Choose API endpoint based on toggle
    //   const endpoint = useOAuth2 ? '/api/send-email' : '/api/send-email-simple';
      
    //   const response = await fetch(endpoint, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     setSubmitStatus({
    //       type: 'success',
    //       message: 'Thank you! Your message has been sent successfully.'
    //     });
    //     // Reset form
    //     setFormData({ name: "", email: "", message: "" });
    //   } else {
    //     setSubmitStatus({
    //       type: 'error',
    //       message: data.error || 'Failed to send message. Please try again.'
    //     });
    //   }
    // } catch (error) {
    //   setSubmitStatus({
    //     type: 'error',
    //     message: 'Network error. Please check your connection and try again.'
    //   });
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-6 rounded-full" />
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-8 text-slate-800 dark:text-slate-100">Contact Information</h3>
              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-4 glass-card p-4 rounded-2xl"
                >
                  <div className="w-14 h-14 glass-card rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-500/20 to-purple-500/20">
                    <svg
                      className="w-7 h-7 text-pink-500 dark:text-pink-400"
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
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Email</h4>
                    <p className="text-slate-600 dark:text-slate-400">Worakij.Wanwong@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-4 glass-card p-4 rounded-2xl"
                >
                  <div className="w-14 h-14 glass-card rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                    <svg
                      className="w-7 h-7 text-purple-500 dark:text-purple-400"
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
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Location</h4>
                    <p className="text-slate-600 dark:text-slate-400">Ladkrabang, Bangkok, Thailand</p>
                  </div>
                </motion.div>

                {/* Social Media Links */}
                <div className="pt-6">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-4 text-lg">Follow Me</h4>
                  <div className="flex space-x-4">
                    {/* GitHub */}
                    <motion.a
                      href="https://github.com/jaikwangg"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-pink-500 dark:hover:text-pink-400 transition-all duration-300"
                      aria-label="GitHub"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </motion.a>

                    {/* Instagram */}
                    <motion.a
                      href="https://instagram.com/Worajai_"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-purple-500 dark:hover:text-purple-400 transition-all duration-300"
                      aria-label="Instagram"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </motion.a>
                  </div>
                </div>

                {/* API Method Toggle (for development/testing) */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">API Method:</span>
                    <button
                      type="button"
                      onClick={() => setUseOAuth2(!useOAuth2)}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        useOAuth2
                          ? 'bg-black dark:bg-white text-white dark:text-black'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      OAuth2
                    </button>
                    <button
                      type="button"
                      onClick={() => setUseOAuth2(!useOAuth2)}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        !useOAuth2
                          ? 'bg-black dark:bg-white text-white dark:text-black'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      App Password
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {useOAuth2 ? 'Using OAuth2 (more secure)' : 'Using App Password (simpler setup)'}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="glass-card rounded-3xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                {/* Status Message */}
                {submitStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-md ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                        : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                    }`}
                  >
                    {submitStatus.message}
                  </motion.div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 glass-card rounded-xl border border-purple-500/30 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 glass-card rounded-xl border border-purple-500/30 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    rows={4}
                    className="w-full px-4 py-3 glass-card rounded-xl border border-purple-500/30 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: isSubmitting ? 1 : 1.02, y: -2 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full glass-card rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl glow-pink"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 