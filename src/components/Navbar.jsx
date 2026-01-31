import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) return savedTheme === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    const html = document.documentElement
    if (darkMode) {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/60 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-3 transition-colors duration-500">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-700 text-white font-bold transition-colors duration-500">
              AH
            </div>
            <div className="font-semibold text-lg text-gray-900 dark:text-gray-100 transition-colors duration-500">
              My Portfolio
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-primary-500 transition-colors duration-500">Home</Link>
          <Link to="/projects" className="hover:text-primary-500 transition-colors duration-500">Projects</Link>
          <Link to="/contact" className="hover:text-primary-500 transition-colors duration-500">Contact</Link>

          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 p-2 rounded-md border border-gray-300 dark:border-gray-700 flex items-center justify-center transition-colors duration-500"
            whileTap={{ rotate: -10 }}
          >
            <AnimatePresence mode="wait">
              {darkMode ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                    rotate: 360,
                    transition: { repeat: Infinity, duration: 2, ease: 'linear' }
                  }}
                  style={{
                    boxShadow: "0 0 8px rgba(255, 223, 0, 0.6)", // constant soft glow
                    borderRadius: "50%"
                  }}
                >
                  <SunIcon className="w-5 h-5 text-yellow-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MoonIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-md border transition-colors duration-500">☰</button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 transition-colors duration-500">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block py-2 transition-colors duration-500">Home</Link>
          <Link to="/projects" onClick={() => setMenuOpen(false)} className="block py-2 transition-colors duration-500">Projects</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block py-2 transition-colors duration-500">Contact</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block py-2 transition-colors duration-500">About</Link>
          <button
            onClick={() => { setDarkMode(!darkMode); setMenuOpen(false) }}
            className="w-full text-left py-2 flex items-center justify-start transition-colors duration-500"
          >
            {darkMode ? <SunIcon className="w-5 h-5 text-yellow-400 mr-2" /> : <MoonIcon className="w-5 h-5 text-gray-800 dark:text-gray-200 mr-2" />}
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
      )}
    </nav>
  )
}
