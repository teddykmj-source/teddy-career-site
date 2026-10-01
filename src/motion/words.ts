// 헤드라인 한 줄을 어절로 나눈다. 빈 어절은 버린다.
export function splitWords(line: string): string[] {
  return line.split(/\s+/).filter(Boolean);
}
