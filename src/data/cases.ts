import { clips, photo, type Clip } from './media';

export type Still = { src: string; alt: string };

export type Case = {
  slug: string;
  title: string;
  client: string;
  year: number;
  services: string[];
  logline: string;
  task: string;
  solution: string;
  clip: Clip;
  stills: Still[];
};

// Черновые тексты. DIEN — реальный проект из ленты @narra.ru, остальные четыре —
// заготовки под направления студии: замените названия, тексты и медиа на настоящие.
export const cases: Case[] = [
  {
    slug: 'dien',
    title: 'Первая коллекция',
    client: 'DIEN · аксессуары из кожи',
    year: 2026,
    services: ['Фирменный стиль', 'Съёмка', 'Анонс премьеры'],
    logline: 'Запуск Collection #1 бренда DIEN by Alina Likhodienko: от знака до тизера с датой премьеры.',
    task: 'Молодому бренду кожаных аксессуаров нужно было выйти к аудитории сразу цельным — с узнаваемым стилем, съёмкой первой коллекции и понятным анонсом.',
    solution: 'Собрали строгую типографику и сдержанную палитру, сняли коллекцию крупными планами фактуры и выпустили серию тизеров с обратным отсчётом до премьеры в августе 2026.',
    clip: clips.leather,
    stills: [
      { src: photo('30975839/pexels-photo-30975839/free-photo-of-luxurious-black-crocodile-leather-handbag-and-belt.jpeg'), alt: 'Чёрная сумка из кожи и ремень' },
      { src: photo('6660912/pexels-photo-6660912.jpeg'), alt: 'Инструменты для работы с кожей' },
      { src: photo('10919291/pexels-photo-10919291.jpeg'), alt: 'Коричневая кожаная сумка' },
      { src: photo('28028339/pexels-photo-28028339/free-photo-of-two-tan-leather-wallets-with-one-open-and-one-closed.jpeg'), alt: 'Два кожаных картхолдера' },
      { src: photo('33277784/pexels-photo-33277784/free-photo-of-minimalist-brown-leather-wallet-on-textured-background.jpeg'), alt: 'Кошелёк на фактурном фоне' },
    ],
  },
  {
    slug: 'tirazh',
    title: 'Тираж',
    client: 'Издательский проект',
    year: 2025,
    services: ['Полиграфия', 'Вёрстка', 'Препресс'],
    logline: 'Журнал, который хочется держать в руках: макет, бумага и контроль печати.',
    task: 'Сделать печатное издание, которое продолжает визуальный язык бренда и не теряет его на бумаге.',
    solution: 'Разработали модульную сетку, подобрали бумагу под фотографии и провели тираж через цветопробу до финального листа.',
    clip: clips.print,
    stills: [
      { src: photo('4271615/pexels-photo-4271615.jpeg'), alt: 'Развороты журналов' },
      { src: photo('4271613/pexels-photo-4271613.jpeg'), alt: 'Открытый журнал на белом столе' },
      { src: photo('2250136/pexels-photo-2250136.jpeg'), alt: 'Журналы на бетоне в солнечном свете' },
      { src: photo('4271625/pexels-photo-4271625.jpeg'), alt: 'Стопка журналов' },
      { src: photo('4857944/pexels-photo-4857944.jpeg'), alt: 'Журнал крупным планом' },
    ],
  },
  {
    slug: 'za-kadrom',
    title: 'За кадром',
    client: 'Бренд одежды',
    year: 2026,
    services: ['Съёмка', 'Арт-дирекшн', 'Backstage'],
    logline: 'Fashion-съёмка капсулы: образ, свет и ритм кадра — от мудборда до ретуши.',
    task: 'Показать капсульную коллекцию так, чтобы одежда жила в кадре, а не просто висела на модели.',
    solution: 'Построили съёмку на контрастном свете и тенях, параллельно сняли backstage для соцсетей бренда.',
    clip: clips.backstage,
    stills: [
      { src: photo('20231996/pexels-photo-20231996/free-photo-of-woman-wearing-coat-in-shadow-in-black-and-white.jpeg'), alt: 'Портрет в пальто в тени' },
      { src: photo('18869915/pexels-photo-18869915/free-photo-of-model-backstage-at-a-fashion-show.jpeg'), alt: 'Модель за кулисами показа' },
      { src: photo('17794520/pexels-photo-17794520/free-photo-of-black-and-white-studio-shot-of-a-woman-in-a-contemporary-outfit.jpeg'), alt: 'Студийный кадр модели' },
      { src: photo('7779761/pexels-photo-7779761.jpeg'), alt: 'Стилист поправляет образ' },
      { src: photo('20238956/pexels-photo-20238956/free-photo-of-woman-in-black-holds-hips-on-hands.jpeg'), alt: 'Чёрно-белый портрет модели' },
    ],
  },
  {
    slug: 'kontur',
    title: 'Контур',
    client: 'Локальный бренд',
    year: 2025,
    services: ['Фирменный стиль', 'Логотип', 'Носители'],
    logline: 'Айдентика с нуля: знак, шрифтовая пара и носители, которые держат форму.',
    task: 'Бренду нужен был стиль, который одинаково работает на бирке, визитке и в сторис.',
    solution: 'Нашли один графический ход — контур — и развернули его в систему: знак, паттерн, упаковку и шаблоны.',
    clip: clips.pencil,
    stills: [
      { src: photo('7598009/pexels-photo-7598009.jpeg'), alt: 'Раскладка брендинговых материалов' },
      { src: photo('12039616/pexels-photo-12039616.jpeg'), alt: 'Тиснение на визитках' },
      { src: photo('8101484/pexels-photo-8101484.jpeg'), alt: 'Крафтовые бирки и канцелярия' },
      { src: photo('5706015/pexels-photo-5706015.jpeg'), alt: 'Визитки на цветном фоне' },
    ],
  },
  {
    slug: 'lenta',
    title: 'Лента',
    client: 'Шоурум',
    year: 2026,
    services: ['Социальные сети', 'Контент-план', 'Reels'],
    logline: 'Ведение соцсетей: визуальная сетка, регулярные съёмки и reels в одном ритме.',
    task: 'Превратить аккаунт из витрины в историю, которую досматривают до конца.',
    solution: 'Собрали визуальную сетку и контент-план на месяц вперёд, наладили съёмочные дни и формат коротких видео.',
    clip: clips.photoshoot,
    stills: [
      { src: photo('16400147/pexels-photo-16400147/free-photo-of-hand-holding-photographic-film-over-vintage-cameras.jpeg'), alt: 'Плёнка над камерами' },
      { src: photo('7205408/pexels-photo-7205408.jpeg'), alt: 'Зарядка плёнки в камеру' },
      { src: photo('18877031/pexels-photo-18877031/free-photo-of-vintage-35-mm-cameras.jpeg'), alt: 'Плёночные камеры 35 мм' },
      { src: photo('13470780/pexels-photo-13470780.jpeg'), alt: 'Плёночная камера и кассеты' },
    ],
  },
];
