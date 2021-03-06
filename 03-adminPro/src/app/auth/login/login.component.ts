import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formSubmitted = false;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // Implement remember me
    const email = localStorage.getItem('email');
    if (email) {
      this.loginForm.get('email')?.setValue(email);
      this.loginForm.get('remember')?.setValue(true);
    }

    // Render button
    this.renderGoogleButton();
  }

  login() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.userService.loginUser(this.loginForm.value).subscribe({
        next: () => {
          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value);
          } else {
            localStorage.removeItem('email');
          }
          // Navigate to dashboard
          this.router.navigateByUrl('/dashboard');
        },
        error: (err: HttpErrorResponse) => {
          Swal.fire('Error', err.error.msg, 'error');
        },
      });
    }
  }

  invalidField(field: string): boolean {
    return (this.formSubmitted && this.loginForm.get(field)?.invalid) ?? true;
  }

  renderGoogleButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
    this.startApp();
  }

  async startApp(): Promise<void> {
    await this.userService.googleInit();
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element: any) {
    this.userService.auth2.attachClickHandler(
      element,
      {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.userService.loginGoogle(id_token).subscribe(() => {
          this.ngZone.run(() => {
            // Navigate to dashboard
            this.router.navigateByUrl('/dashboard');
          });
        });
      },
      (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
