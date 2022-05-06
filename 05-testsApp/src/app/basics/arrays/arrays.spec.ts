import { getRobots } from './arrays';

describe('Arrays tests', () => {
  xit('It should return at least 3 robots', () => {
    const res = getRobots();
    // Greater or equal
    expect(res.length).toBeGreaterThanOrEqual(3);
  });

  xit('It should contain MegaMan and Ultron', () => {
    const res = getRobots();
    expect(res).toContain('MegaMan');
    expect(res).toContain('Ultron');
  })

});
