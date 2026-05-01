import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageIntro } from '../components/PageIntro'
import {
  diagnosisQuestions,
  recommendationsFromScores,
  scoreAnswers,
} from '../data/diagnosis'

export function Diagnosis() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const q = diagnosisQuestions[step]
  const isLast = step === diagnosisQuestions.length - 1

  const scores = useMemo(
    () => scoreAnswers(answers),
    [answers],
  )
  const recs = useMemo(() => recommendationsFromScores(scores), [scores])

  const pick = (optionId: string) => {
    if (!q) return
    setAnswers((a) => ({ ...a, [q.id]: optionId }))
    if (!isLast) setStep((s) => s + 1)
    else setStep(diagnosisQuestions.length)
  }

  if (step >= diagnosisQuestions.length) {
    return (
      <>
        <PageIntro
          title="Ваш план на ближайшие минуты"
          subtitle="Рекомендации основаны на ответах; это не оценка «надёжности», а ориентир по действиям."
        />
        <ol className="list-plain" style={{ paddingLeft: '1.25rem' }}>
          {recs.map((r) => (
            <li key={r.href + r.title} style={{ marginBottom: '1rem' }}>
              <Link to={r.href}>{r.title}</Link>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {r.reason}
              </div>
            </li>
          ))}
        </ol>
        <div className="btn-row">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setAnswers({})
              setStep(0)
            }}
          >
            Пройти снова
          </button>
          <Link to="/platforms" className="btn btn--primary">
            К чек-листам
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <PageIntro
        title="Быстрая диагностика"
        subtitle={`Вопрос ${step + 1} из ${diagnosisQuestions.length}`}
      />
      <div className="progress-bar" aria-hidden>
        <div
          className="progress-bar__fill"
          style={{
            width: `${((step + 1) / diagnosisQuestions.length) * 100}%`,
          }}
        />
      </div>
      <p className="quiz-prompt">{q.prompt}</p>
      <div role="group" aria-label={q.prompt}>
        {q.options.map((o) => (
          <button
            key={o.id}
            type="button"
            className="quiz-option"
            onClick={() => pick(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </>
  )
}
