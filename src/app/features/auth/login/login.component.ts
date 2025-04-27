import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/logs/user-loging.service';
import { SectionSpinnerComponent } from "../../../shared/components/spinner/spinner-loading.component";
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../../shared/services/toast-notification/tost-notification.service';
import { TokenService } from '../../../shared/services/token-managment/token-management.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SectionSpinnerComponent, ToastModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Privates
  private tokenService = inject(TokenService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  // Publics
  loginForm: FormGroup;
  passwordVisible = false;
  isLoading = false;

  // Constructor
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['easytechnologyy1@gmail.com', [Validators.required, Validators.email]],
      password: ['88888888', [Validators.required, Validators.minLength(6)]]
    });
  }

  // on submit form
  onSubmit(): void {
    this.isLoading = true; // Start loading spinner in all cases

    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (response) => {
          this.toastService.success('Good!', 'You have successfully logged in.');
          this.loginForm.reset();
          this.loginForm.markAsPristine();
          this.loginForm.markAsUntouched();
          this.tokenService.setToken(response.token, response.data.result.role); // Store the token in local storage

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        },
        error: (error) => {
          console.log(error);
          this.toastService.error('Error!', error.error?.message || 'An unexpected error occurred. Please try again.');
        }
      }).add(() => {
        this.isLoading = false; // Stop loading spinner in all cases
      });

    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

}