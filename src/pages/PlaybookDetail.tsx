import { Link, useParams } from 'react-router-dom'
import { PageIntro } from '../components/PageIntro'
import { playbooks } from '../data/playbooks'
import { getPlatform } from '../data/platforms'

export function PlaybookDetail() {
  const { id } = useParams<{ id: string }>()
  const pb = playbooks.find((p) => p.id === id)

  if (!pb) {
    return (
      <>
        <PageIntro title="Сценарий не найден" />
        <Link to="/recovery">← К списку</Link>
      </>
    )
  }

  return (
    <>
      <p style={{ marginBottom: '0.75rem' }}>
        <Link to="/recovery" style={{ fontSize: '0.9rem' }}>
          ← Все сценарии
        </Link>
      </p>
      <PageIntro title={pb.title} subtitle={pb.lead} />
      {pb.relatedPlatformIds?.length ? (
        <p style={{ fontSize: '0.9rem' }}>
          Связанные чек-листы:{' '}
          {pb.relatedPlatformIds.map((pid, i) => {
            const name = getPlatform(pid)?.name ?? pid
            return (
              <span key={pid}>
                {i > 0 ? ', ' : ''}
                <Link to={`/platforms/${pid}`}>{name}</Link>
              </span>
            )
          })}
        </p>
      ) : null}
      {pb.steps.map((s, i) => (
        <article key={i} className="step-block">
          <h2 style={{ fontSize: '1rem', marginTop: 0 }}>{s.title}</h2>
          <p style={{ marginBottom: 0 }}>{s.body}</p>
        </article>
      ))}
    </>
  )
}
