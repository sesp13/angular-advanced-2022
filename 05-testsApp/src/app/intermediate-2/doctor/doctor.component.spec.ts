import { HttpClientModule } from '@angular/common/http';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { DoctorComponent } from './doctor.component';
import { DoctorService } from './doctor.service';

describe('Doctor Component', () => {
  let component: DoctorComponent;
  let fixture: ComponentFixture<DoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorComponent],
      imports: [HttpClientModule],
      providers: [DoctorService],
    });
    fixture = TestBed.createComponent(DoctorComponent);
    component = fixture.componentInstance;
  });

  it('The component should be rendered', () => {
    expect(component).toBeTruthy();
  });

  it('It should return doctor name', () => {
    const name = 'John';
    const message = component.greetDoctor(name);
    expect(message).toContain(name);
  });
});
