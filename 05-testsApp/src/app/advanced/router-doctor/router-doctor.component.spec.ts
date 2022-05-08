import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';

import { RouterDoctorComponent } from './router-doctor.component';

class FakeRouter {
  navigate(params: any) {}
}

class FakeActivatedRoute {
  private subject = new Subject();

  get params() {
    return this.subject.asObservable();
  }

  push(value: any) {
    this.subject.next(value);
  }
}

describe('RouterDoctorComponent', () => {
  let component: RouterDoctorComponent;
  let fixture: ComponentFixture<RouterDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouterDoctorComponent],
      providers: [
        { provide: Router, useClass: FakeRouter },
        { provide: ActivatedRoute, useClass: FakeActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("It should redirect to doctors when it's saved", () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.saveDoctor();
    expect(spy).toHaveBeenCalledWith(['doctor', '123']);
  });

  it('It should set id = new', () => {
    component = fixture.componentInstance;
    const activatedRoute: FakeActivatedRoute = TestBed.get(ActivatedRoute);
    activatedRoute.push({ id: 'new' });
    expect(component.id).toBe('new');
  });
});
