import { cases } from './cases';

// Сайт может жить не в корне домена (например, на GitHub Pages: /polina-narra/).
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const href = (path: string) => `${BASE}${path}`;

export const site = {
  person: 'Полина',
  studio: 'NARRA',
  role: 'основатель креативной студии NARRA',
  // Строка из шапки профиля @narra.ru
  motto: 'Визуальные и коммуникационные решения через смысл, структуру и ясность',
  instagram: 'narra.ru',
  // TODO: заменить на реальные контакты Полины — сейчас это заглушки.
  telegram: 'narra_ru',
  email: 'hello@narra.ru',
  year: 2026,
};

export const nav = [
  { href: href('/'), label: 'Обо мне', scene: 'Сцена 01' },
  { href: href('/cases/'), label: 'Кейсы', scene: 'Сцена 02' },
  { href: href('/contacts/'), label: 'Контакты', scene: 'Сцена 03' },
];

// Надписи на «хлопушке», которая закрывает экран при переходе между страницами.
export const slates: Record<string, [string, string]> = {
  ...Object.fromEntries(nav.map((n) => [n.href, [n.scene, n.label] as [string, string]])),
  ...Object.fromEntries(
    cases.map((c, i) => [href(`/cases/${c.slug}/`), [`Кейс ${String(i + 1).padStart(2, '0')}`, c.title] as [string, string]]),
  ),
};
