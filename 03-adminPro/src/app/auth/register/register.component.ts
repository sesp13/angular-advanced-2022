import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formSubmitted = false;

  registerForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      terms: [false, [Validators.required]],
    },
    { validators: [this.equalPasswords('password', 'password2')] }
  );

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    // Default fields
    this.registerForm.reset({
      name: 'Santiago',
      email: 'test@test.com',
      password: '123123',
      password2: '123123',
    });
  }

  createUser(): void {
    this.formSubmitted = true;

    if (this.registerForm.valid) {
      this.userService.createUser(this.registerForm.value).subscribe({
        next: (res) => {
          Swal.fire('Success', 'The user was created', 'success');
        },
        error: (err: HttpErrorResponse) => {
          Swal.fire('Error', err.error.msg, 'error');
        },
      });
    }
  }

  invalidField(field: string): boolean {
    return (
      (this.formSubmitted && this.registerForm.get(field)?.invalid) ?? true
    );
  }

  invalidPasswords(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    return this.formSubmitted && pass1 !== pass2;
  }

  equalPasswords(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ notEqual: true });
      }
    };
  }

  invalidTerms(): boolean {
    return (
      (!this.registerForm.get('terms')?.value && this.formSubmitted) ?? true
    );
  }
}
