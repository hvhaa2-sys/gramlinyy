import { Link } from 'react-router-dom'
import { PageIntro } from '../components/PageIntro'
import { playbooks } from '../data/playbooks'

const scenarioIcons: Record<string, string> = {
  ugon: '🔓',
  'poteryal-telefon': '📵',
  'podozritelnyj-vhod': '👀',
  'prosyat-kod': '💬',
}

const scenarioUrgency: Record<string, { label: string; cls: string }> = {
  ugon: { label: 'Срочно', cls: 'badge--danger' },
  'poteryal-telefon': { label: 'Срочно', cls: 'badge--danger' },
  'podozritelnyj-vhod': { label: 'Проверить', cls: 'badge--warn' },
  'prosyat-kod': { label: 'Осторожно', cls: 'badge--warn' },
}

export function Recovery() {
  return (
    <>
      <PageIntro
        title="Сценарии восстановления"
        subtitle="Короткие playbook: что делать по шагам, когда некогда читать длинные статьи."
      />

      <div className="callout callout--warn" style={{ marginBottom: '1.25rem' }}>
        <strong>📋 Как пользоваться:</strong> выберите сценарий, который ближе к вашей ситуации,
        и следуйте шагам. Открыть из официального приложения, не по ссылкам из сообщений.
      </div>

      <div className="card-grid">
        {playbooks.map((pb) => {
          const icon = scenarioIcons[pb.id] ?? '⚡'
          const urgency = scenarioUrgency[pb.id]
          return (
            <Link key={pb.id} to={`/recovery/${pb.id}`} className="card-link scenario-card">
              <div className="scenario-card__top">
                <span className="scenario-icon" aria-hidden>{icon}</span>
                {urgency && (
                  <span className={`badge ${urgency.cls}`}>{urgency.label}</span>
                )}
              </div>
              <h2>{pb.title}</h2>
              <p>{pb.lead}</p>
            </Link>
          )
        })}
      </div>
    </>
  )
}
