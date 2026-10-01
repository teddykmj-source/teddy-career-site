// 지표 문자열에서 숫자만 떼어 0 부터 올려 보여주는 순수 함수. DOM 을 모른다.
export interface StatParts { prefix: string; target: number; suffix: string; grouped: boolean }

const NUM = /\d+(?:,\d{3})*/;

export function parseStat(text: string): StatParts | null {
  const m = NUM.exec(text);
  if (!m) return null;
  const raw = m[0];
  return {
    prefix: text.slice(0, m.index),
    target: Number(raw.replace(/,/g, '')),
    suffix: text.slice(m.index + raw.length),
    grouped: raw.includes(','),
  };
}

export function formatStat(parts: StatParts, progress: number): string {
  const p = Math.min(1, Math.max(0, progress));
  const n = Math.round(parts.target * p);
  const s = parts.grouped ? n.toLocaleString('en-US') : String(n);
  return parts.prefix + s + parts.suffix;
}

/** ease-out cubic. 0..1 을 0..1 로, 앞부분이 빠르다. */
export function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
