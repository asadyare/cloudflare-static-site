import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navLinks = [
  { href: '#top', id: 'top', label: 'Home' },
  { href: '#skills', id: 'skills', label: 'Skills' },
  { href: '#projects', id: 'projects', label: 'Projects' },
  { href: '#pipeline', id: 'pipeline', label: 'Pipeline' },
  { href: '#monitoring', id: 'monitoring', label: 'Monitoring' },
  { href: '#repo', id: 'repo', label: 'Repository' },
  { href: '#contact', id: 'contact', label: 'Contact' },
]

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

  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState(() => {
    if (typeof window === 'undefined') return 'top'
    return window.location.hash ? window.location.hash.replace('#', '') : 'top'
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sync = () => {
      setActiveId(window.location.hash ? window.location.hash.replace('#', '') : 'top')
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${
        scrolled
          ? 'bg-white/85 dark:bg-gray-950/85 border-gray-200/50 dark:border-gray-800/50'
          : 'bg-white/60 dark:bg-gray-950/60 border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center space-x-3 group">
          <div className="relative flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl flex items-center justify-center bg-white dark:bg-gray-900 ring-1 ring-gray-200/80 dark:ring-gray-700/80 group-hover:ring-primary-500/40 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 text-[15px] font-medium tracking-[0.2em] text-gray-800 dark:text-gray-100 group-hover:text-primary-500 transition-colors">
                AH
              </span>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <span className="font-semibold text-lg tracking-tight">My Portfolio</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeId === link.id
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? 'text-primary-500 bg-primary-500/10 dark:bg-primary-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {link.label}
              </a>
            )
          })}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700"
            aria-label="Toggle theme"
          >
            {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700"
            aria-label="Menu"
          >
            {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-1 border-t border-gray-200 dark:border-gray-800">
          {navLinks.map((link) => {
            const isActive = activeId === link.id
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 px-4 rounded-lg font-medium ${
                  isActive ? 'text-primary-500 bg-primary-500/10' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </div>
      )}
    </nav>
  )
}
