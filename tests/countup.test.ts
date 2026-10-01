// 지표 문자열 파싱과 진행률 포맷을 검증한다. 숫자 앞뒤 문자와 천 단위 구분을 보존해야 한다.
import { describe, it, expect } from 'vitest';
import { parseStat, formatStat, easeOut } from '../src/motion/countup';
import { getContent } from '../src/data';

describe('parseStat', () => {
  it('한글 접미사를 보존한다', () => {
    expect(parseStat('11년+')).toEqual({ prefix: '', target: 11, suffix: '년+', grouped: false });
  });
  it('천 단위 구분이 있으면 grouped', () => {
    expect(parseStat('2,200+')).toEqual({ prefix: '', target: 2200, suffix: '+', grouped: true });
  });
  it('영문 접미사와 기호', () => {
    expect(parseStat('11+ yrs')).toEqual({ prefix: '', target: 11, suffix: '+ yrs', grouped: false });
    expect(parseStat('2×')).toEqual({ prefix: '', target: 2, suffix: '×', grouped: false });
    expect(parseStat('14')).toEqual({ prefix: '', target: 14, suffix: '', grouped: false });
  });
  it('문장 가운데 숫자는 접두사와 접미사를 모두 보존한다', () => {
    expect(parseStat('개발 중 · 테스트 케이스 200건')).toEqual({ prefix: '개발 중 · 테스트 케이스 ', target: 200, suffix: '건', grouped: false });
    expect(parseStat('In development · 200 test cases')).toEqual({ prefix: 'In development · ', target: 200, suffix: ' test cases', grouped: false });
  });
  it('숫자가 없으면 null', () => {
    expect(parseStat('구현 완료')).toBeNull();
  });
});

describe('formatStat', () => {
  const p = parseStat('2,200+')!;
  it('진행률 1 은 원문과 같다', () => expect(formatStat(p, 1)).toBe('2,200+'));
  it('진행률 0 은 0 부터 시작한다', () => expect(formatStat(p, 0)).toBe('0+'));
  it('중간값도 천 단위 구분을 유지한다', () => expect(formatStat(p, 0.5)).toBe('1,100+'));
  it('범위 밖 진행률은 잘라낸다', () => {
    expect(formatStat(p, 1.7)).toBe('2,200+');
    expect(formatStat(p, -1)).toBe('0+');
  });
  it('접두사와 접미사를 그대로 붙인다', () => {
    expect(formatStat(parseStat('개발 중 · 테스트 케이스 200건')!, 1)).toBe('개발 중 · 테스트 케이스 200건');
  });
});

describe('easeOut', () => {
  it('양 끝은 고정이고 중간은 앞당겨진다', () => {
    expect(easeOut(0)).toBe(0);
    expect(easeOut(1)).toBe(1);
    expect(easeOut(0.5)).toBeCloseTo(0.875);
  });
});

describe('실제 콘텐츠 왕복', () => {
  it('지표와 자동화 상태 문자열은 진행률 1 에서 원문으로 돌아온다', () => {
    for (const c of [getContent('ko'), getContent('en')]) {
      const strings = [...c.stats.map((s) => s.value), ...c.automation.map((a) => a.status)];
      for (const s of strings) {
        const p = parseStat(s);
        expect(p, s).not.toBeNull();
        expect(formatStat(p!, 1)).toBe(s);
      }
    }
  });
  it('잘못된 쉼표와 선행 0 도 원문을 보존한다', () => {
    expect(formatStat(parseStat('항목 3, 기타')!, 1)).toBe('항목 3, 기타');
    expect(formatStat(parseStat('1,2')!, 1)).toBe('1,2');
  });
});
