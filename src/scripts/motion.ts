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

initCount();
