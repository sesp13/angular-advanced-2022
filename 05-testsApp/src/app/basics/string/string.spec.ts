import { message } from './string';

describe('String tests', () => {
  it('It must return a string', () => {
    const res = message('Santiago');
    expect(typeof res).toBe('string');
  });

  it('It should return a greeting', () => {
    const name = 'Santiago';
    const res = message(name);
    expect(res).toContain(`Hello! ${name}`);
  });
});
