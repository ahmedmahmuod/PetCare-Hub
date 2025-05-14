import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/logs/user-loging.service';
import { SectionSpinnerComponent } from "../../../shared/components/spinner/spinner-loading.component";
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../../shared/services/toast-notification/tost-notification.service';
import { TokenService } from '../../../shared/services/token-managment/token-management.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PopupService } from '../../../shared/components/login-poup/popupLog.service';
import { LoginPopupComponent } from "../../../shared/components/login-poup/login-popup.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SectionSpinnerComponent, ToastModule, TranslateModule, LoginPopupComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  // Privates
  private tokenService = inject(TokenService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private translate = inject(TranslateService);
  private popUpSerivce = inject(PopupService);

  ngOnInit(): void {
    this.popUpSerivce.showPopup();
  }
  
  // Publics
  loginForm: FormGroup;
  passwordVisible = false;
  isLoading = false;
  
  // Constructor
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // on submit form
  onSubmit(): void {
    this.isLoading = true; // Start loading spinner in all cases

    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (response) => {
          this.toastService.success(this.translate.instant('Pages.Auth.Login_Page.If_Success.Title'), this.translate.instant('Pages.Auth.Login_Page.If_Success.Details'));
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
          this.toastService.error(this.translate.instant('Pages.Auth.Login_Page.If_Error.Title'), this.translate.instant('Pages.Auth.Login_Page.If_Error.Details') || 'An unexpected error occurred. Please try again.');
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