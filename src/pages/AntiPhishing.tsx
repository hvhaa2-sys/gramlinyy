import { Link } from 'react-router-dom'
import { PageIntro } from '../components/PageIntro'

const flags = [
  {
    icon: '📲',
    text: 'Просят код из SMS, Telegram, почты или приложения-аутентификатора.',
  },
  {
    icon: '⏱️',
    text: '«Поддержка» пишет первой и торопит: «срочно», «блокировка через 10 минут».',
  },
  {
    icon: '🔗',
    text: 'Ссылка с опечаткой в домене или сокращатель, ведущий неизвестно куда.',
  },
  {
    icon: '🎁',
    text: 'Розыгрыш приза, который нужно «подтвердить» входом или кодом.',
  },
  {
    icon: '🤖',
    text: 'Знакомый просит деньги или переслать что-то — но тон сообщения не его.',
  },
]

const steps = [
  {
    icon: '✋',
    text: 'Остановитесь, не переходите по ссылке, не отправляйте код.',
  },
  {
    icon: '📱',
    text: 'Откройте настройки аккаунта только из официального приложения или сайта (адрес вручную).',
  },
  {
    icon: '🚫',
    text: 'Заблокируйте контакт и при необходимости сообщите о спаме платформе.',
  },
]

export function AntiPhishing() {
  return (
    <>
      <PageIntro
        title="Антифишинг"
        subtitle="Правило нуля: код входа, пароль и резервные коды — только для вас. Их не запрашивают ни поддержка, ни «администрация», ни друзья."
      />

      <div className="callout callout--danger">
        <strong>🚨 Никому не отправляйте код входа.</strong> Если попросили — это почти всегда
        мошенничество. Идите в{' '}
        <Link to="/recovery/prosyat-kod">сценарий «просят код»</Link>.
      </div>

      <h2>🚩 Красные флаги</h2>
      <div style={{ marginBottom: '1.25rem' }}>
        {flags.map((f) => (
          <div key={f.text} className="flag-item">
            <span className="flag-item__icon" aria-hidden>{f.icon}</span>
            <span className="flag-item__text">{f.text}</span>
          </div>
        ))}
      </div>

      <h2>✅ Что делать в моменте</h2>
      <div style={{ marginBottom: '1.25rem' }}>
        {steps.map((s, i) => (
          <div key={s.text} className="action-step">
            <div className="action-step__num" aria-hidden>{i + 1}</div>
            <div className="action-step__body">
              <span className="action-step__icon" aria-hidden>{s.icon}</span>
              <span>{s.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="callout callout--warn">
        <strong>⚠️ Утечки данных</strong> делают фишинг убедительнее: мошенник может знать ваше
        имя или последние цифры телефона. Это не доказательство легитимности. См. также{' '}
        <Link to="/recovery">восстановление и контроль доступа</Link>.
      </div>
    </>
  )
}
