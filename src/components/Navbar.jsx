import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import profilePhoto from '../assets/profile-photo.png'

const navLinks = [
  { href: '/#top', id: 'top', label: 'Home' },
  { href: '/#skills', id: 'skills', label: 'Skills' },
  { href: '/#credentials', id: 'credentials', label: 'Credentials' },
  { href: '/#projects', id: 'projects', label: 'Projects' },
  { href: '/#pipeline', id: 'pipeline', label: 'Pipeline' },
  { href: '/#monitoring', id: 'monitoring', label: 'Monitoring' },
  { href: '/#repo', id: 'repo', label: 'Repository' },
  { href: '/#contact', id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard'

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
      if (location.pathname !== '/') return
      setActiveId(window.location.hash ? window.location.hash.replace('#', '') : 'top')
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [location.pathname])

  const linkClass = (active) =>
    `px-4 py-2 rounded-lg font-medium transition-colors ${
      active ? 'text-primary bg-primary/20' : 'text-muted-foreground hover:text-primary hover:bg-muted'
    }`

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${
        scrolled
          ? 'bg-background/90 border-border'
          : 'bg-background/70 border-transparent'
      }`}
    >
      <div className="w-full px-4 py-3 flex items-center justify-between">
        <a href="/#top" className="flex items-center space-x-3 group">
          <div className="relative w-11 h-11 rounded-2xl bg-card ring-1 ring-border overflow-hidden shadow-[var(--shadow-neon)] group-hover:ring-primary/60 transition-all duration-300">
            <img
              src={profilePhoto}
              alt="Asad profile"
              className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-primary-500/20 mix-blend-soft-light" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-foreground">
            Asad Ali <span className="text-primary font-medium">| DevSecOps Engineer</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = !isDashboard && location.pathname === '/' && activeId === link.id
            return (
              <a key={link.id} href={link.href} className={linkClass(isActive)}>
                {link.label}
              </a>
            )
          })}
          <Link to="/dashboard" className={linkClass(isDashboard)}>
            Live metrics
          </Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 p-2.5 rounded-lg border border-border hover:bg-muted text-foreground transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-lg border border-border text-foreground"
            aria-label="Toggle theme"
          >
            {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg border border-border text-foreground"
            aria-label="Menu"
          >
            {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-1 border-t border-border">
          {navLinks.map((link) => {
            const isActive = !isDashboard && location.pathname === '/' && activeId === link.id
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 px-4 rounded-lg font-medium text-foreground ${
                  isActive ? 'text-primary bg-primary/20' : 'hover:bg-muted'
                }`}
              >
                {link.label}
              </a>
            )
          })}
          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className={`block py-3 px-4 rounded-lg font-medium text-foreground ${
              isDashboard ? 'text-primary bg-primary/20' : 'hover:bg-muted'
            }`}
          >
            Live metrics
          </Link>
        </div>
      )}
    </nav>
  )
}
