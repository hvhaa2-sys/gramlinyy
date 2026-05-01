import { PageIntro } from '../components/PageIntro'
import { glossary } from '../data/glossary'

export function Glossary() {
  return (
    <>
      <PageIntro
        title="Коротко о терминах"
        subtitle="Без лекции: по 3–5 предложений там, где они реально встречаются в настройках."
      />
      {glossary.map((g) => (
        <article key={g.slug} id={g.slug} className="step-block" style={{ scrollMarginTop: '4rem' }}>
          <h2 style={{ fontSize: '1.05rem', marginTop: 0 }}>{g.term}</h2>
          <p style={{ marginBottom: 0 }}>{g.definition}</p>
        </article>
      ))}
    </>
  )
}
