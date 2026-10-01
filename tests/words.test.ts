// 헤드라인 어절 분할. 공백 종류와 빈 어절을 안전하게 다뤄야 한다.
import { describe, it, expect } from 'vitest';
import { splitWords } from '../src/motion/words';
import { getContent } from '../src/data';

describe('splitWords', () => {
  it('공백으로 나눈다', () => {
    expect(splitWords('지식재산을 수익과 전략으로')).toEqual(['지식재산을', '수익과', '전략으로']);
  });
  it('연속 공백과 양끝 공백을 버린다', () => {
    expect(splitWords('  a  b ')).toEqual(['a', 'b']);
    expect(splitWords('')).toEqual([]);
  });
  it('두 로케일 헤드라인이 모두 어절을 가진다', () => {
    for (const c of [getContent('ko'), getContent('en')]) {
      for (const line of c.headline) expect(splitWords(line).length).toBeGreaterThan(0);
    }
  });
});
