import { IncrementadorComponent } from './incrementador.component';

describe('Incrementador Component Unit', () => {
  let component: IncrementadorComponent;

  beforeEach(() => {
    component = new IncrementadorComponent();
  });

  it(`The progress shouldn't pass 100`, () => {
    component.progreso = 50;
    component.cambiarValor(5);
    expect(component.progreso).toBe(55);
  });
});
