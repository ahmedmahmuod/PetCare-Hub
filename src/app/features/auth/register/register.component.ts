import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../shared/services/toast-notification/tost-notification.service';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../core/services/auth/logs/user-loging.service';
import { SectionSpinnerComponent } from "../../../shared/components/spinner/spinner-loading.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ToastModule, SectionSpinnerComponent, TranslateModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  
})
export class RegisterComponent {
  // Privates 
  private authService = inject(AuthService)
  private router = inject(Router);
  private translate = inject(TranslateService);

  // Global Variables
  registerForm: FormGroup;
  passwordVisible = false;
  isLoading = false;

  constructor(private fb: FormBuilder, private toastService: ToastService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // on submit function to handle form submission
  onSubmit(): void {
    this.isLoading = true; // Start loading spinner
    
    if (this.registerForm.valid) {
      this.authService.signUp(this.registerForm.value).subscribe({
        next: (response) => {
          this.toastService.success(this.translate.instant('Pages.Auth.Register.Toasts.Successful.Title'), this.translate.instant('Pages.Auth.Register.Toasts.Successful.Message'));
          this.registerForm.reset();
          this.registerForm.markAsPristine();
          this.registerForm.markAsUntouched();

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        },
        error: (error) => {
          console.log(error);
          this.toastService.error(this.translate.instant('Pages.Auth.Register.Toasts.Errors.Title'), this.translate.instant('Pages.Auth.Register.Toasts.Errors.Message') || 'An unexpected error occurred. Please try again.');
        }
      }).add(() => {
        this.isLoading = false; // Stop loading spinner in all cases
      });

    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // function to toggle password visibility
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

}