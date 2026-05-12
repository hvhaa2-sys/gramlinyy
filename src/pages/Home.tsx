import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { platforms } from '../data/platforms'

type HomeCard = {
  to: string
  badge: string
  badgeClass: string
  icon: string
  iconImage?: string
  title: string
  desc: string
}

const cards: HomeCard[] = [
  {
    to: '/diagnosis',
    badge: '~3 минуты',
    badgeClass: '',
    icon: '🔍',
    title: 'Быстрая диагностика',
    desc: 'Несколько вопросов — и список первых действий по важности.',
  },
  {
    to: '/platforms',
    badge: 'Must have',
    badgeClass: '',
    icon: '📋',
    iconImage: '/icons/platforms.svg',
    title: 'Платформы',
    desc: 'Telegram, VK, MAX: пароль, 2FA, сессии, восстановление.',
  },
  {
    to: '/antiphishing',
    badge: 'Срочно читать',
    badgeClass: 'badge--warn',
    icon: '🎣',
    title: 'Антифишинг',
    desc: 'Код никому не пересылаем. Красные флаги и типовые уловки.',
  },
  {
    to: '/recovery',
    badge: 'Тревога',
    badgeClass: 'badge--danger',
    icon: '🚨',
    title: 'Что делать сейчас',
    desc: 'Сценарии: угнали аккаунт, потерял телефон, просят код, чужой вход.',
  },
]

function useTotalProgress() {
  const [done, setDone] = useState(0)
  const total = platforms.reduce((s, p) => s + p.items.length, 0)

  useEffect(() => {
    let count = 0
    for (const p of platforms) {
      try {
        const raw = localStorage.getItem(`checklist:${p.id}`)
        if (raw) {
          const obj = JSON.parse(raw) as Record<string, boolean>
          count += Object.values(obj).filter(Boolean).length
        }
      } catch {}
    }
    setDone(count)
  }, [])

  return { done, total }
}

export function Home() {
  const { done, total } = useTotalProgress()
  const pct = total ? Math.round((done / total) * 100) : 0

  return (
    <>
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero__icon" aria-hidden>🛡️</div>
        <h1 className="home-hero__title">Защита аккаунта<br />без лишнего стресса</h1>
        <p className="home-hero__sub">
          Короткие чек-листы по платформам, антифишинг и что делать, если что-то пошло не так.
        </p>

        {done > 0 && (
          <div className="home-progress">
            <div className="home-progress__label">
              <span>Пройдено пунктов</span>
              <strong>{done} / {total}</strong>
            </div>
            <div className="progress-bar" aria-hidden>
              <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}
      </section>

      {/* Cards */}
      <div className="card-grid card-grid--2">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className="card-link home-card">
            <div className="home-card__top">
              {c.iconImage ? (
                <img src={c.iconImage} alt="" aria-hidden className="home-card__icon home-card__icon--img" />
              ) : (
                <span className="home-card__icon" aria-hidden>{c.icon}</span>
              )}
              <span className={`badge ${c.badgeClass}`}>{c.badge}</span>
            </div>
            <h2>{c.title}</h2>
            <p>{c.desc}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
