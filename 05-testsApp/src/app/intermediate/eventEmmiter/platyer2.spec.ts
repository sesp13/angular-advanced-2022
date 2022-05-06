import { Player2 } from './player2';

describe('Event Emmiter tests', () => {
  let player: Player2;

  beforeEach(() => {
    player = new Player2();
  });

  it('It must emit an event when damage is received', () => {
    let newHp = 0;

    player.hpChange.subscribe((hp: number) => {
      newHp = hp;
    });

    player.receiveDamage(1000);

    expect(newHp).toBe(0);
  });

  it('It must emit an event when damage is received and survive if its under 100', () => {
    let newHp = 0;

    player.hpChange.subscribe((hp: number) => {
      newHp = hp;
    });

    player.receiveDamage(50);

    expect(newHp).toBe(50);
  });
});
