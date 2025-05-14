import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/logs/user-loging.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast-notification/tost-notification.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class PasswordResetComponent implements OnInit, OnDestroy {
  userId = '';
  currentStep = 1;
  loading = false;
  submitted = false;
  resendCountdown = 0;
  countdown = 3;
  countdownInterval: any;
  passwordStrength = '';
  passwordStrengthText = '';
  
  email: string | null = null;
  code: string | null = null;
  savedUserId: string | null = null;

  private router = inject(Router);
  private toastService = inject(ToastService);
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);

  emailForm: FormGroup;
  verificationForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.verificationForm = this.formBuilder.group({
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required],
      digit5: ['', Validators.required],
      digit6: ['', Validators.required]
    });

    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.matchingPasswords('password', 'confirmPassword')
    });

    this.restoreState();
  }

  ngOnInit() {
    if (this.currentStep === 4) {
      this.startRedirectCountdown();
    }
  }

  get progressWidth(): string {
    return `${((this.currentStep - 1) / 3) * 100}%`;
  }

  getStepClass(step: number): string {
    if (this.currentStep > step) return 'completed';
    if (this.currentStep === step) return 'active';
    return '';
  }

  private restoreState() {
    if (isPlatformBrowser(this.platformId)) {
      const storedEmail = localStorage.getItem('email');
      const storedCode = localStorage.getItem('code');
      const storedUserId = localStorage.getItem('userId');

      if (storedEmail) {
        this.emailForm.patchValue({ email: storedEmail });
      }

      if (storedCode && this.currentStep >= 2) {
        const digits = storedCode.split('');
        digits.forEach((digit, index) => {
          this.verificationForm.get(`digit${index + 1}`)?.setValue(digit);
        });
      }

      if (storedUserId) {
        this.userId = storedUserId;
      }
    }
  }

  private saveState() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('email', this.emailForm.value.email);
      if (this.isCodeValid()) {
        localStorage.setItem('code', this.getFullCode());
      }
      if (this.userId) {
        localStorage.setItem('userId', this.userId);
      }
    }
  }

  submitEmail() {
    this.submitted = true;
    if (this.emailForm.invalid) return;

    this.loading = true;
    const email = this.emailForm.value.email;

    this.authService.requestForgetPassword(email).subscribe({
      next: () => {
        this.loading = false;
        this.submitted = false;
        this.currentStep = 2;
        this.saveState();
        this.startResendCountdown();
      },
      error: (error) => {
        this.toastService.error(this.translate.instant('Pages.Auth.Forget_Pass_Page.Errors.Email.Error'), this.translate.instant('Pages.Auth.Forget_Pass_Page.Errors.Email.Details'));
        this.loading = false;
      }
    });
  }

  submitCode() {
    this.submitted = true;
    if (!this.isCodeValid()) return;

    this.loading = true;
    const code = this.getFullCode();
    
    this.authService.verifyCode(code).subscribe({
      next: (res) => {
        this.userId = res.userId;
        this.loading = false;
        this.submitted = false;
        this.currentStep = 3;
        this.saveState();
      },
      error: (error) => {        
        this.toastService.error(this.translate.instant('Pages.Auth.Forget_Pass_Page.Errors.Code.Error'),  this.translate.instant('Pages.Auth.Forget_Pass_Page.Errors.Code.Details') || 'Invalid verification code. Please try again.');
        this.loading = false;
      }
    });
  }

  submitPassword() {
    this.submitted = true;
    if (this.passwordForm.invalid) return;

    if (!this.userId) {
      console.error('No user ID available to reset password.');
      return;
    }

    this.loading = true;
    const { password, confirmPassword } = this.passwordForm.value;
    const newPasswords = { password, confirmPassword };

    this.authService.resetPassword(this.userId, newPasswords).subscribe({
      next: () => {
        this.loading = false;
        this.currentStep = 4;
        this.saveState();
        this.startRedirectCountdown();
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }

  onCodeInput(event: any, position: number) {
    const input = event.target;
    const nextInput = input.nextElementSibling;
    const prevInput = input.previousElementSibling;

    if (event.key === 'Backspace') {
      if (prevInput) {
        prevInput.focus();
      }
      return;
    }

    if (input.value && nextInput) {
      nextInput.focus();
    }
  }

  handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    const paste = event.clipboardData?.getData('text') || '';
    const digits = paste.replace(/\D/g, '').split('').slice(0, 6);

    Object.keys(this.verificationForm.controls).forEach((key, index) => {
      if (digits[index]) {
        this.verificationForm.get(key)?.setValue(digits[index]);
      }
    });
  }

  isCodeValid(): boolean {
    return Object.values(this.verificationForm.value).every(digit => digit);
  }

  getFullCode(): string {
    return Object.values(this.verificationForm.value).join('');
  }

  resendCode() {
    if (this.resendCountdown > 0) return;

    this.loading = true;
    this.authService.requestForgetPassword(this.emailForm.value.email).subscribe({
      next: () => {
        this.loading = false;
        this.startResendCountdown();
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }

  startResendCountdown() {
    this.resendCountdown = 60;
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }

    this.countdownInterval = setInterval(() => {
      this.resendCountdown--;
      if (this.resendCountdown <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  startRedirectCountdown() {
    this.countdown = 3;
  
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  
    this.countdownInterval = setInterval(() => {
      this.countdown--;
  
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
        this.redirectToLogin();
      }
    }, 1000);
  }
  
  redirectToLogin() {
    this.router.navigate(['/auth/login']);
  }

  checkPasswordStrength() {
    const password = this.passwordForm.get('password')?.value || '';

    if (!password) {
      this.passwordStrength = '';
      this.passwordStrengthText = '';
      return;
    }

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 0:
      case 1:
        this.passwordStrength = 'strength-weak';
        this.passwordStrengthText = this.translate.instant('Pages.Auth.Forget_Pass_Page.Step_Three.Form.Password_Strength.Weak');
        break;
      case 2:
        this.passwordStrength = 'strength-medium';
        this.passwordStrengthText = this.translate.instant('Pages.Auth.Forget_Pass_Page.Step_Three.Form.Password_Strength.Medium');
        break;
      case 3:
      case 4:
        this.passwordStrength = 'strength-strong';
        this.passwordStrengthText = this.translate.instant('Pages.Auth.Forget_Pass_Page.Step_Three.Form.Password_Strength.Strong');
        break;
      case 5:
        this.passwordStrength = 'strength-very-strong';
        this.passwordStrengthText = this.translate.instant('Pages.Auth.Forget_Pass_Page.Step_Three.Form.Password_Strength.Very_Strong');
        break;
    }
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ matching: true });
      } else {
        const errors = confirmPassword.errors || {};
        delete errors['matching'];
        confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
      }
    };
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
