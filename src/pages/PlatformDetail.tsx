import { Link, useParams } from 'react-router-dom'
import { getPlatform } from '../data/platforms'
import { useChecklistStorage } from '../hooks/useChecklistStorage'

export function PlatformDetail() {
  const { id } = useParams<{ id: string }>()
  const platform = id ? getPlatform(id) : undefined
  const itemIds = platform?.items.map((i) => i.id) ?? []
  const { checked, toggle, doneCount, total, reset } = useChecklistStorage(
    id ?? '_',
    itemIds,
  )

  if (!platform) {
    return (
      <>
        <p><Link to="/platforms">← Все платформы</Link></p>
        <h1>Платформа не найдена</h1>
      </>
    )
  }

  const pct = total ? Math.round((doneCount / total) * 100) : 0
  const allDone = doneCount === total && total > 0

  return (
    <>
      <p style={{ marginBottom: '0.75rem' }}>
        <Link to="/platforms" style={{ fontSize: '0.9rem' }}>
          ← Все платформы
        </Link>
      </p>

      {/* Platform header */}
      <div className="platform-detail-header">
        <span className="platform-detail-icon" aria-hidden>{platform.icon}</span>
        <div>
          <h1 style={{ marginBottom: '0.25rem' }}>{platform.name}</h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            {platform.short}
          </p>
        </div>
      </div>

      <div className="stat-strip" style={{ marginTop: '0.75rem' }}>
        {platform.officialUrl && (
          <a
            href={platform.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="stat-pill"
            style={{ textDecoration: 'none' }}
          >
            <span className="stat-pill__icon">🔗</span> Официальная справка
          </a>
        )}
        <span className="stat-pill">
          <span className="stat-pill__icon">📅</span> {platform.lastReviewed}
        </span>
      </div>

      {/* Progress */}
      <div className="checklist-progress">
        <div className="checklist-progress__top">
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
            {allDone
              ? '✅ Всё выполнено!'
              : `Прогресс: ${doneCount} / ${total}`}
          </span>
          <button type="button" className="btn btn--ghost" onClick={reset}
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.7rem' }}>
            Сбросить
          </button>
        </div>
        <div className="progress-bar" aria-hidden>
          <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
        </div>
        {allDone && (
          <p style={{ fontSize: '0.85rem', color: 'var(--accent)', margin: '0.35rem 0 0', fontWeight: 600 }}>
            Отлично! Теперь проверьте другие платформы или пройдите диагностику.
          </p>
        )}
      </div>

      {/* Checklist items */}
      {platform.items.map((item) => (
        <section
          key={item.id}
          className={`step-block checklist-item${checked[item.id] ? ' checklist-item--done' : ''}`}
        >
          <div className="check-item" style={{ border: 'none', padding: 0, marginBottom: '0.75rem' }}>
            <input
              type="checkbox"
              id={`chk-${item.id}`}
              checked={!!checked[item.id]}
              onChange={() => toggle(item.id)}
            />
            <label htmlFor={`chk-${item.id}`}>{item.title}</label>
          </div>
          <ol className="list-plain">
            {item.steps.map((s, i) => (
              <li key={i}>
                <span>{s.text}</span>
                {s.image && (
                  <img
                    src={s.image}
                    alt={s.alt ?? s.text}
                    loading="lazy"
                    className="step-screenshot"
                  />
                )}
              </li>
            ))}
          </ol>
          {item.tip ? (
            <div className="callout" style={{ margin: '0.5rem 0 0', padding: '0.65rem 0.85rem' }}>
              <strong>💡 Смысл: </strong>{item.tip}
            </div>
          ) : null}
        </section>
      ))}

      <div className="callout" style={{ marginTop: '1.25rem' }}>
        <strong>😟 Страх потерять доступ?</strong> Сохраните резервные коды и проверьте почту для
        восстановления до того, как смените телефон. Подробнее в{' '}
        <Link to="/glossary">терминах</Link> и в{' '}
        <Link to="/recovery/poteryal-telefon">сценарии «потерял телефон»</Link>.
      </div>
    </>
  )
}
