import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

// Плавная инерционная прокрутка. Модуль один на страницу, поэтому экземпляр тоже один.
export const lenis: Lenis | null = reduced ? null : new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });

if (lenis) {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

export function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y, { duration: 1.4 });
  else window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
}

/* ── Видео: подгружаем и играем только то, что в кадре ── */
const videoObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      const video = entry.target as HTMLVideoElement;
      if (entry.isIntersecting) {
        if (!video.getAttribute('src')) video.src = video.dataset.src!;
        if (!reduced) video.play().catch(() => {});
      } else if (!video.paused) {
        video.pause();
      }
    }
  },
  { rootMargin: '30% 30%' },
);

export function watchVideos(root: ParentNode = document) {
  root.querySelectorAll<HTMLVideoElement>('video[data-src]').forEach((video) => {
    if (video.hasAttribute('data-eager')) video.src = video.dataset.src!;
    video.addEventListener('playing', () => video.classList.add('is-playing'), { once: true });
    videoObserver.observe(video);
  });
}

/* ── Шторка между страницами: «склейка» со сменой сцены ── */
function initCurtain() {
  const curtain = document.querySelector<HTMLElement>('.curtain');
  const slates: Record<string, [string, string]> = JSON.parse(
    document.getElementById('slates')?.textContent || '{}',
  );
  if (!curtain) return;
  const scene = curtain.querySelector('.curtain__scene')!;
  const title = curtain.querySelector('.curtain__title')!;

  document.addEventListener('click', (event) => {
    const link = (event.target as Element).closest?.('a');
    if (!link || event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if ((link.target && link.target !== '_self') || link.hasAttribute('download')) return;

    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname) {
      if (url.hash) return;
      event.preventDefault();
      scrollToY(0);
      return;
    }

    event.preventDefault();
    const [s, t] = slates[url.pathname] || ['', ''];
    scene.textContent = s;
    title.textContent = t;
    closeMenu();
    curtain.classList.add('is-closing');
    lenis?.stop();
    setTimeout(() => (location.href = url.href), reduced ? 0 : 620);
  });

  // Возврат кнопкой «назад» из bfcache — снимаем шторку.
  addEventListener('pageshow', (event) => {
    if (event.persisted) {
      curtain.classList.remove('is-closing');
      lenis?.start();
    }
  });
}

/* ── Таймкод: сколько «фильма» вы уже прокрутили (24 кадра в секунду) ── */
function initTimecode() {
  const el = document.querySelector('[data-timecode]');
  if (!el) return;
  const pad = (n: number) => String(n).padStart(2, '0');
  let last = -1;
  const render = () => {
    const frames = Math.max(0, Math.round(window.scrollY / 4));
    if (frames === last) return;
    last = frames;
    const s = Math.floor(frames / 24);
    el.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(frames % 24)}`;
  };
  render();
  if (lenis) lenis.on('scroll', render);
  else addEventListener('scroll', render, { passive: true });
}

/* ── Зерно: генерируем шум один раз и крутим его CSS-анимацией ── */
function initGrain() {
  if (reduced) return;
  const size = 160;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  document.documentElement.style.setProperty('--grain', `url(${canvas.toDataURL('image/png')})`);
}

/* ── Подпись у курсора над кликабельным медиа ── */
function initCursor() {
  if (!finePointer || reduced) return;
  const cursor = document.querySelector<HTMLElement>('.cursor');
  const label = cursor?.querySelector('.cursor__label');
  if (!cursor || !label) return;
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });
  addEventListener('pointermove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });
  document.addEventListener('pointerover', (e) => {
    const target = (e.target as Element).closest?.<HTMLElement>('[data-cursor]');
    if (!target) return;
    label.textContent = target.dataset.cursor!;
    cursor.classList.add('has-label');
  });
  document.addEventListener('pointerout', (e) => {
    const target = (e.target as Element).closest?.('[data-cursor]');
    if (target && !target.contains(e.relatedTarget as Node)) cursor.classList.remove('has-label');
  });
}

/* ── Мобильное меню ── */
const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');

function setMenu(open: boolean) {
  if (!menuButton) return;
  document.documentElement.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('[data-menu-label]')!.textContent = open ? 'Закрыть' : 'Меню';
}

function closeMenu() {
  setMenu(false);
}

function initMenu() {
  if (!menuButton) return;
  menuButton.addEventListener('click', () => {
    const open = !document.documentElement.classList.contains('menu-open');
    setMenu(open);
    open ? lenis?.stop() : lenis?.start();
  });
  addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !document.documentElement.classList.contains('menu-open')) return;
    setMenu(false);
    lenis?.start();
    menuButton.focus();
  });
}

initCurtain();
initTimecode();
initGrain();
initCursor();
initMenu();
watchVideos();

// Шрифты и постеры меняют высоту блоков — пересчитываем триггеры, когда всё загрузилось.
document.fonts?.ready.then(() => ScrollTrigger.refresh());
addEventListener('load', () => ScrollTrigger.refresh());

export { gsap, ScrollTrigger };
