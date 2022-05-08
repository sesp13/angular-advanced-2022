import { DoctorComponent } from 'src/app/intermediate-2/doctor/doctor.component';
import { routes } from './app.routes';

describe('Main routes', () => {
  it('The route /doctor/:id should exist', () => {
    expect(routes).toContain({
      path: 'doctor/:id',
      component: DoctorComponent,
    });
  });
});
