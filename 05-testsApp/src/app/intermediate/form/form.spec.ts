import { FormBuilder } from '@angular/forms';

import { FormRegister } from './form';

describe('Forms', () => {
  let component: FormRegister;

  beforeEach(() => {
    component = new FormRegister(new FormBuilder());
  });

  it('It must create a form with 2 fields: email, password', () => {
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });

  it('email must be required', () => {
    const control = component.form.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('email must be a valid email', () => {
    const control = component.form.get('email');
    control?.setValue('fernando@email.com');
    expect(control?.valid).toBeTruthy();
  });
});
