import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageIntro } from '../components/PageIntro'
import { platforms } from '../data/platforms'

function usePlatformProgress(id: string, total: number) {
  const [done, setDone] = useState(0)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`checklist:${id}`)
      if (raw) {
        const obj = JSON.parse(raw) as Record<string, boolean>
        setDone(Object.values(obj).filter(Boolean).length)
      }
    } catch {}
  }, [id])
  return { done, pct: total ? Math.round((done / total) * 100) : 0 }
}

function PlatformCard({ p }: { p: (typeof platforms)[number] }) {
  const total = p.items.length
  const { done, pct } = usePlatformProgress(p.id, total)

  return (
    <Link to={`/platforms/${p.id}`} className="card-link platform-card">
      <div className="platform-card__header">
        <span className="platform-icon" aria-hidden>{p.icon}</span>
      </div>
      <h2>{p.name}</h2>
      <p>{p.short}</p>

      {done > 0 ? (
        <div className="platform-card__progress">
          <div className="platform-card__progress-label">
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Прогресс</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600 }}>
              {done}/{total}
            </span>
          </div>
          <div className="progress-bar" aria-hidden style={{ margin: '0.25rem 0 0' }}>
            <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      ) : (
        <p style={{ fontSize: '0.78rem', marginTop: '0.5rem', marginBottom: 0, color: 'var(--text-muted)' }}>
          {total} пункт{total === 1 ? '' : total < 5 ? 'а' : 'ов'} · обновлено {p.lastReviewed}
        </p>
      )}
    </Link>
  )
}

export function Platforms() {
  return (
    <>
      <PageIntro
        title="Чек-листы по платформам"
        subtitle="Один формат для всех: пароль, двухфакторка, сессии, восстановление. Отмечайте пункты — прогресс сохранится в браузере."
      />
      <div className="card-grid card-grid--2">
        {platforms.map((p) => (
          <PlatformCard key={p.id} p={p} />
        ))}
      </div>
    </>
  )
}
