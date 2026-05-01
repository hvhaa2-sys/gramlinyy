import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import './Layout.css'

const nav = [
  { to: '/', label: 'Главная', end: true },
  { to: '/diagnosis', label: 'Диагностика' },
  { to: '/platforms', label: 'Платформы' },
  { to: '/antiphishing', label: 'Антифишинг' },
  { to: '/recovery', label: 'Тревога' },
  { to: '/glossary', label: 'Термины' },
  { to: '/memo', label: 'Памятка' },
]

function getInitialTheme(): 'light' | 'dark' | 'system' {
  try {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  } catch {}
  return 'system'
}

function applyTheme(theme: 'light' | 'dark' | 'system') {
  const root = document.documentElement
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark')
  } else if (theme === 'light') {
    root.setAttribute('data-theme', 'light')
  } else {
    root.removeAttribute('data-theme')
  }
}

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(getInitialTheme)
  const menuRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    applyTheme(theme)
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  const cycleTheme = () => {
    setTheme((t) => (t === 'system' ? 'light' : t === 'light' ? 'dark' : 'system'))
  }

  const themeIcon = theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '🌗'
  const themeLabel = theme === 'dark' ? 'Тёмная' : theme === 'light' ? 'Светлая' : 'Авто'

  return (
    <div className="layout">
      <header className="site-header" ref={menuRef}>
        <NavLink to="/" className="brand" end>
          <span className="brand-mark" aria-hidden>🛡️</span>
          <span className="brand-text">Дозор</span>
        </NavLink>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={cycleTheme}
            title={`Тема: ${themeLabel}`}
            aria-label={`Переключить тему (сейчас: ${themeLabel})`}
          >
            <span aria-hidden>{themeIcon}</span>
          </button>

          <button
            type="button"
            className={`burger${menuOpen ? ' burger--open' : ''}`}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>

        <nav
          className={`site-nav${menuOpen ? ' site-nav--open' : ''}`}
          aria-label="Основное меню"
        >
          {nav.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link--active' : 'nav-link'
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>
          Учебный информационный ресурс. Интерфейсы соцсетей меняются — перепроверяйте шаги в
          официальных справках. Мы не запрашиваем пароли и коды.
        </p>
      </footer>
    </div>
  )
}
