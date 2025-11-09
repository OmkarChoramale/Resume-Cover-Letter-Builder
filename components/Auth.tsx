
import React, { useState, type FC, type FormEvent } from 'react';
import { motion } from 'framer-motion';

interface AuthProps {
  onLoginSuccess: () => void;
}

const Auth: FC<AuthProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 overflow-hidden">
        <motion.div 
            className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.3, delayChildren: 0.2 }
                }
            }}
        >
            <motion.div 
                className="text-center md:text-left"
                variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }}}
            >
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                    Craft Your <br/> Professional <span className="text-[var(--accent)]">Future.</span>
                </h1>
                <p className="mt-4 text-lg text-gray-300 max-w-lg mx-auto md:mx-0">
                    Build professional resumes and cover letters with AI-powered elegance. Stand out from the crowd and land your dream job.
                </p>
            </motion.div>

            <motion.div 
                className="w-full max-w-md p-8 m-4 space-y-8 bg-black/40 backdrop-blur-2xl border border-[var(--border-color)] rounded-2xl shadow-2xl shadow-[var(--accent)]/10 mx-auto"
                variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }}}
            >
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-white">Elegance<span style={{color: 'var(--accent)'}}>AI</span></h1>
                  <p className="mt-2 text-gray-400">Welcome. Access the future of resume building.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                    <div className="relative mt-1 group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-0 group-focus-within:opacity-75 transition duration-200"></div>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="relative w-full px-4 py-3 text-white bg-black/50 border border-[var(--border-color)] rounded-lg shadow-sm focus:outline-none transition"
                          placeholder="you@example.com"
                        />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                    <div className="relative mt-1 group">
                         <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-0 group-focus-within:opacity-75 transition duration-200"></div>
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="relative w-full px-4 py-3 text-white bg-black/50 border border-[var(--border-color)] rounded-lg shadow-sm focus:outline-none transition"
                          placeholder="••••••••"
                        />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 font-semibold text-black bg-[var(--accent)] rounded-lg shadow-lg shadow-[var(--accent)]/20 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-[var(--accent)] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isLoading ? (
                        <svg className="w-5 h-5 text-black animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        'Login'
                      )}
                    </button>
                  </div>
                </form>
                 <p className="text-sm text-center text-gray-400">
                    No account? <a href="#" className="font-medium text-[var(--accent)] hover:underline">Sign up</a>
                </p>
            </motion.div>
        </motion.div>
    </div>
  );
};

export default Auth;