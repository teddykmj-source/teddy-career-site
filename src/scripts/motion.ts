// 모션 런타임. 카운트업과 포인터 틸트처럼 CSS 만으로 안 되는 것만 여기서 한다.
import { parseStat, formatStat, easeOut } from '../motion/countup';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function countUp(el: HTMLElement): void {
  const parts = parseStat(el.textContent ?? '');
  if (!parts) return;
  const dur = 1200;
  let start = 0;
  const tick = (now: number) => {
    if (!start) start = now;
    const t = Math.min(1, (now - start) / dur);
    el.textContent = formatStat(parts, easeOut(t));
    if (t < 1) requestAnimationFrame(tick);
  };
  el.textContent = formatStat(parts, 0);
  requestAnimationFrame(tick);
}

function initCount(): void {
  if (reduce || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      countUp(e.target as HTMLElement);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => io.observe(el));
}

function initTilt(): void {
  const stack = document.querySelector<HTMLElement>('.stack');
  const card = document.querySelector<HTMLElement>('.stack-a');
  if (!stack || !card || reduce) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const MAX = 5;
  stack.addEventListener('pointermove', (e) => {
    const r = stack.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.setProperty('--ry', `${(x * MAX * 2).toFixed(2)}deg`);
    card.style.setProperty('--rx', `${(-y * MAX * 2).toFixed(2)}deg`);
  });
  stack.addEventListener('pointerleave', () => {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  });
}

initCount();
initTilt();
