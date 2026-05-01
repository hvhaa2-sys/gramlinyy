import type { DiagnosisQuestion } from './types'

export const diagnosisQuestions: DiagnosisQuestion[] = [
  {
    id: 'q1',
    prompt: 'Включена ли у вас двухфакторная аутентификация хотя бы в основных аккаунтах?',
    options: [
      { id: '2fa-all', label: 'Да, почти везде', weights: { ok: 2 } },
      { id: '2fa-some', label: 'Только в части сервисов', weights: { twofa: 2, ok: 1 } },
      { id: '2fa-none', label: 'Нет или не уверен(а)', weights: { twofa: 3 } },
    ],
  },
  {
    id: 'q2',
    prompt: 'Используете ли вы разные пароли для важных сервисов?',
    options: [
      { id: 'pw-unique', label: 'Да, везде разные', weights: { ok: 2 } },
      { id: 'pw-few', label: 'Несколько паролей на всё', weights: { password: 2 } },
      { id: 'pw-one', label: 'Один или почти один пароль', weights: { password: 3 } },
    ],
  },
  {
    id: 'q3',
    prompt: 'Проверяли ли активные сессии / устройства за последний месяц?',
    options: [
      { id: 'sess-yes', label: 'Да', weights: { ok: 1 } },
      { id: 'sess-no', label: 'Нет', weights: { sessions: 2 } },
    ],
  },
  {
    id: 'q4',
    prompt: 'Были ли просьбы прислать код, подозрительные ссылки или «поддержка» в личке?',
    options: [
      { id: 'phish-no', label: 'Нет', weights: { ok: 1 } },
      { id: 'phish-maybe', label: 'Похоже, да / не уверен(а)', weights: { phishing: 2 } },
      { id: 'phish-yes', label: 'Да, точно', weights: { phishing: 3 } },
    ],
  },
  {
    id: 'q5',
    prompt: 'Что вас чаще всего останавливает перед настройкой защиты?',
    options: [
      { id: 'bar-settings', label: 'Не знаю, где настройки', weights: { platforms: 2 } },
      { id: 'bar-fear', label: 'Боюсь потерять доступ', weights: { recovery: 2 } },
      { id: 'bar-steps', label: 'Слишком много шагов', weights: { platforms: 1 } },
      { id: 'bar-none', label: 'Ничего / уже настроил(а)', weights: { ok: 1 } },
    ],
  },
]

export type DiagnosisScores = Record<string, number>

export function scoreAnswers(
  answers: Record<string, string>,
): DiagnosisScores {
  const scores: DiagnosisScores = {}
  for (const q of diagnosisQuestions) {
    const optId = answers[q.id]
    const opt = q.options.find((o) => o.id === optId)
    if (!opt) continue
    for (const [k, v] of Object.entries(opt.weights)) {
      scores[k] = (scores[k] ?? 0) + v
    }
  }
  return scores
}

export type Recommendation = { title: string; href: string; reason: string }

export function recommendationsFromScores(scores: DiagnosisScores): Recommendation[] {
  const list: Recommendation[] = []
  const push = (r: Recommendation) => list.push(r)

  if ((scores.twofa ?? 0) >= 2) {
    push({
      title: 'Включить 2FA',
      href: '/platforms',
      reason: 'Второй фактор резко снижает риск взлома даже при утечке пароля.',
    })
  }
  if ((scores.password ?? 0) >= 2) {
    push({
      title: 'Уникальные пароли и менеджер',
      href: '/glossary',
      reason: 'Один пароль на всё — если утёк один раз, страдают все сервисы.',
    })
  }
  if ((scores.sessions ?? 0) >= 2) {
    push({
      title: 'Проверить активные сессии',
      href: '/platforms',
      reason: 'Так вы увидите, где аккаунт уже открыт.',
    })
  }
  if ((scores.phishing ?? 0) >= 2) {
    push({
      title: 'Разбор антифишинга',
      href: '/antiphishing',
      reason: 'Социальная инженерия — главный бытовой риск.',
    })
  }
  if ((scores.recovery ?? 0) >= 2) {
    push({
      title: 'Резервный доступ без страха',
      href: '/recovery/poteryal-telefon',
      reason: 'Резервные коды и почта помогают не застрять после включения защиты.',
    })
  }
  if ((scores.platforms ?? 0) >= 2) {
    push({
      title: 'Чек-лист по вашей платформе',
      href: '/platforms',
      reason: 'Пошагово, без общих фраз.',
    })
  }
  if (list.length === 0) {
    push({
      title: 'Закрепить привычки',
      href: '/platforms',
      reason: 'Пройдите чек-лист для Telegram и VK — это займёт немного времени.',
    })
  }
  return list.slice(0, 5)
}
