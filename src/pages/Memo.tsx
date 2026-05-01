import { PageIntro } from '../components/PageIntro'

export function Memo() {
  return (
    <>
      <PageIntro
        title="Памятка на сегодня"
        subtitle="Можно распечатать или сохранить скрин. Персональных данных мы не собираем."
      />
      <div className="step-block" id="print-area">
        <ol className="list-plain" style={{ marginBottom: 0 }}>
          <li>Включить двухфакторную аутентификацию в Telegram, VK и почте.</li>
          <li>Уникальные пароли; удобнее — менеджер паролей.</li>
          <li>Проверить активные сессии и завершить лишние.</li>
          <li>Код входа никому не отправлять — ни «поддержке», ни друзьям.</li>
          <li>Сохранить резервные коды 2FA вне телефона (не в переписке).</li>
          <li>Ссылки из срочных сообщений не открывать — зайти в настройки из приложения.</li>
        </ol>
      </div>
      <div className="btn-row">
        <button type="button" className="btn btn--primary" onClick={() => window.print()}>
          Печать / PDF
        </button>
      </div>
      <style>{`
        @media print {
          .site-header,
          .site-footer,
          .btn-row,
          .page-subtitle {
            display: none !important;
          }
          .site-main {
            max-width: 100%;
            padding: 0;
          }
        }
      `}</style>
    </>
  )
}
