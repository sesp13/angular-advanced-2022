import { Player } from './class';

describe('Class tests', () => {
  let player = new Player();
  
  // Tests lifeCycle
  
  beforeAll(() => {
    // console.log('Before all');
  });
  
  beforeEach(() => {
    // Reset player value before each test
    player = new Player();
    // console.log('Before each');
  });

  afterEach(() => {
    // console.log('After each');
  });

  afterAll(() => {
    // console.log('After all');
  });

  it('It should return 80hp if it gets damaged by 20', () => {
    // const player = new Player();
    const res = player.receiveDamage(20);
    expect(res).toBe(80);
  });

  it('It should return 50hp if it gets damaged by 50', () => {
    // const player = new Player();
    const res = player.receiveDamage(50);
    expect(res).toBe(50);
  });

  it('It should return 0hp if it gets damaged by 101', () => {
    // const player = new Player();
    const res = player.receiveDamage(100);
    expect(res).toBe(0);
  });
});
