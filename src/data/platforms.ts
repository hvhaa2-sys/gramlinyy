import type { Platform } from './types'

export const platforms: Platform[] = [
  {
    id: 'telegram',
    name: 'Telegram',
    short: 'Облачный пароль, код-пароль на приложение, активные сеансы.',
    icon: '✈️',
    iconImage: '/icons/telegram.svg',
    priority: false,
    lastReviewed: '2026-05',
    officialUrl: 'https://telegram.org/faq/?setln=ru',
    items: [
      {
        id: 'tg-open-privacy',
        title: 'Открыть «Конфиденциальность» в Telegram',
        steps: [
          { text: 'В нижней панели Telegram нажмите «Настройки».', image: '/images/telegram/01-settings.jpg' },
          { text: 'Прокрутите вниз и откройте «Конфиденциальность».', image: '/images/telegram/02-privacy.jpg' },
        ],
        tip: 'Все следующие шаги стартуют с этого экрана.',
      },
      {
        id: 'tg-pw',
        title: 'Облачный пароль (Two-Step Verification)',
        steps: [
          { text: 'В разделе «Конфиденциальность» откройте «Облачный пароль».', image: '/images/telegram/03-cloud-password.jpg' },
          { text: 'Задайте надёжный пароль, добавьте подсказку только для себя и резервную почту.', image: '/images/telegram/04-cloud-password-enter.jpg' },
        ],
        tip: 'Без облачного пароля злоумышленник с доступом к SIM может перенести аккаунт на свой телефон.',
      },
      {
        id: 'tg-app',
        title: 'Код-пароль и Face ID на приложение',
        steps: [
          { text: 'В разделе «Конфиденциальность» откройте «Код-пароль и Face ID».', image: '/images/telegram/05-passcode-faceid.jpg' },
          { text: 'Нажмите «Включить код-пароль» и при желании добавьте разблокировку по Face ID / отпечатку.', image: '/images/telegram/06-passcode-enable.jpg' },
        ],
        tip: 'Если забудете код-пароль — придётся переустанавливать приложение, секретные чаты будут утеряны. Запишите его в менеджере паролей.',
      },
      {
        id: 'tg-sess',
        title: 'Активные сеансы и устройства',
        steps: [
          { text: 'Вернитесь в «Настройки» и откройте «Устройства».', image: '/images/telegram/07-devices.jpg' },
          { text: 'Просмотрите активные сеансы. Если видите чужие — нажмите «Завершить другие сеансы».', image: '/images/telegram/08-terminate-sessions.jpg' },
        ],
      },
      {
        id: 'tg-notify',
        title: 'Новые входы',
        steps: [
          { text: 'Убедитесь, что уведомления о входе с нового устройства включены (зависит от версии клиента).' },
        ],
      },
    ],
  },
  {
    id: 'vk',
    name: 'VK / VK ID',
    short: 'Полный путь до раздела «Безопасность» в приложении ВК + 2FA, устройства и пароль.',
    icon: '💬',
    iconImage: '/icons/vk.svg',
    priority: false,
    lastReviewed: '2026-05',
    officialUrl: 'https://id.vk.com/account/#/security',
    items: [
      {
        id: 'vk-open-security',
        title: 'Открыть раздел «Безопасность» в приложении ВК',
        steps: [
          { text: 'Откройте меню — иконка «•••» в правом верхнем углу.', image: '/images/vk/01-menu.jpg' },
          { text: 'В выпадающем списке выберите «Настройки».', image: '/images/vk/02-settings.jpg' },
          { text: 'Нажмите «Управление аккаунтом VK ID».', image: '/images/vk/03-vk-id.jpg' },
          { text: 'Переключитесь на вкладку «Безопасность».', image: '/images/vk/04-security.jpg' },
        ],
        tip: 'Это общий путь — все следующие шаги стартуют именно отсюда.',
      },
      {
        id: 'vk-2fa',
        title: 'Включить двухфакторную аутентификацию',
        steps: [
          { text: 'В блоке «Способы входа» включите «Двухфакторную аутентификацию» (по желанию — и «Вход по скану лица или отпечатку пальца»).', image: '/images/vk/05-login-methods.jpg' },
          { text: 'Подтвердите номер телефона и сохраните резервные коды вне устройства (бумага, менеджер паролей).' },
        ],
        tip: 'Без 2FA любой, кто получил доступ к SIM-карте, может зайти в аккаунт.',
      },
      {
        id: 'vk-devices',
        title: 'Проверить устройства и выйти на чужих',
        steps: [
          { text: 'В блоке «Устройства и активность» откройте «Список устройств и история активности».', image: '/images/vk/06-devices.jpg' },
          { text: 'Просмотрите список. Если видите незнакомые сессии — нажмите «Выйти на других устройствах».', image: '/images/vk/07-logout-others.jpg' },
        ],
      },
      {
        id: 'vk-password',
        title: 'Сменить пароль',
        steps: [
          { text: 'В блоке «Пароль» нажмите «Ваш пароль» и задайте новый — длинный, уникальный, лучше из менеджера паролей.', image: '/images/vk/08-password.jpg' },
        ],
        tip: 'Меняйте пароль после любой утечки или подозрения на компрометацию.',
      },
    ],
  },
  {
    id: 'max',
    name: 'MAX',
    short: 'Российский мессенджер от VK: пароль для входа, устройства, платежи.',
    icon: '🅼',
    iconImage: '/icons/max.png',
    priority: false,
    lastReviewed: '2026-05',
    officialUrl: 'https://max.ru/',
    items: [
      {
        id: 'max-open-security',
        title: 'Открыть раздел «Безопасность» в приложении MAX',
        steps: [
          { text: 'В нижней панели приложения нажмите «Настройки».', image: '/images/max/01-settings-tab.jpg' },
          { text: 'В профиле выберите пункт «Безопасность» (со значком замка).', image: '/images/max/02-settings-list.jpg' },
        ],
        tip: 'Это общий путь — все следующие шаги стартуют именно отсюда.',
      },
      {
        id: 'max-2fa',
        title: 'Установить пароль для входа (двухфакторная защита)',
        steps: [
          { text: 'В «Безопасности» откройте «Пароль для входа» — красная точка значит, что он ещё не задан.', image: '/images/max/03-security.jpg' },
          { text: 'Нажмите «Установить пароль».', image: '/images/max/04-password-intro.jpg' },
          { text: 'Придумайте пароль от 6 символов (с заглавными, цифрами и спецсимволами) и нажмите «Сохранить».', image: '/images/max/05-password-input.jpg' },
          { text: 'Готово. Приложение само завершит все другие сессии — так и должно быть.', image: '/images/max/06-password-done.jpg' },
        ],
        tip: 'Без пароля MAX пускает по одному коду из SMS — этого мало. Пароль = второй фактор после кода.',
      },
      {
        id: 'max-sess',
        title: 'Проверить устройства и выйти на чужих',
        steps: [
          { text: 'Вернитесь в «Настройки» и откройте «Устройства».', image: '/images/max/07-devices-link.jpg' },
          { text: 'Просмотрите активные сессии. Если видите чужие — нажмите «Завершить все сессии, кроме текущей».', image: '/images/max/08-devices-list.jpg' },
        ],
      },
      {
        id: 'max-pay',
        title: 'Платежи и привязки',
        steps: [
          { text: 'Если используете оплату или Госуслуги через MAX — отдельно проверьте этот раздел.' },
          { text: 'Не подтверждайте чужие операции и не вводите коды по чужой просьбе.' },
        ],
        tip: 'MAX интегрирован с госсервисами и платежами — это делает аккаунт более чувствительной целью.',
      },
    ],
  },
]

export function getPlatform(id: string): Platform | undefined {
  return platforms.find((p) => p.id === id)
}
