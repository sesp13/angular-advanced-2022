import { increment } from "./numbers"

describe('Numbers tests', () => {
  it('If the number is greater than 100 it should return 100',  () => {
    const res = increment(100);
    expect(res).toBe(100);
  });
  it('If the number is lesser than 100 it should return the number plus one',  () => {
    const res = increment(50);
    expect(res).toBe(51);
  });
})