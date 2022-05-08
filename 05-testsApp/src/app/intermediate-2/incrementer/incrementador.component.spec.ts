import { TestBed, ComponentFixture } from '@angular/core/testing';
import { IncrementadorComponent } from './incrementador.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('Incremendator Component', () => {
  let component: IncrementadorComponent;
  let fixture: ComponentFixture<IncrementadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncrementadorComponent],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(IncrementadorComponent);
    component = fixture.componentInstance;
  });

  it('it should show the legend and progress', () => {
    const legend = 'Loading process';
    component.leyenda = legend;

    // Trigger detectChanges
    fixture.detectChanges();

    // Get element form html
    const elem: HTMLElement = fixture.debugElement.query(
      By.css('h3')
    ).nativeElement;

    expect(elem.innerHTML).toContain(legend);
  });

  it('It should show in the input the progress value', async () => {
    component.cambiarValor(5);
    // Wait until its stable
    fixture.detectChanges();
    await fixture.whenStable();
    const elem = fixture.debugElement.query(By.css('input')).nativeElement;
    console.log(elem);
    expect(elem.value).toBe('55');
  });

  it('It should increment / decrement in 5, with a click on the button', async () => {
    const buttons = fixture.debugElement.queryAll(By.css('.btn-primary'));
    // Initial value 50

    // Trigger something Decrement 5
    buttons[0].triggerEventHandler('click', null);
    // Trigger something Increment 5
    buttons[1].triggerEventHandler('click', null);
    expect(component.progreso).toBe(50);
  });

  it('In the component title it should show the progress', async () => {
    const buttons = fixture.debugElement.queryAll(By.css('.btn-primary'));
    // Decrement things
    buttons[0].triggerEventHandler('click', null);

    // Wait changes cycle
    fixture.detectChanges();
    await fixture.whenStable();

    // Capture and test title
    const elem: HTMLElement = fixture.debugElement.query(
      By.css('h3')
    ).nativeElement;
    expect(elem.innerHTML).toContain('45');
  });
});
