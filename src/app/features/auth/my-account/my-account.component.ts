import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserData } from '../../../core/models/user/details/user-details.model';
import { Observable } from 'rxjs';
import { UsersService } from '../../../core/services/user/users.service';
import { ToastService } from '../../../shared/services/toast-notification/tost-notification.service';
import { SectionSpinnerComponent } from "../../../shared/components/spinner/spinner-loading.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SectionSpinnerComponent, TranslateModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  private userService = inject(UsersService);
  private toastService = inject(ToastService);
  private translate = inject(TranslateService);
  
  profileForm: FormGroup;
  imagePreview: string = 'logos/user-profile.jpg'; // Default avatar
  userData$: Observable<UserData | null> = this.userService.user$;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      profileImage: [null],
      passwordCurrent: ['', [Validators.minLength(8)]],
      password: ['', [Validators.minLength(8)]]
    }, { validators: this.passwordValidators });
  }

  ngOnInit(): void {
    this.userData$.subscribe(user => {
      if (user) {
        this.profileForm.patchValue({
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber
        });

        if (user.profileImage) {
          this.imagePreview = user.profileImage;
        }
      }
    });
  }

  passwordValidators(form: AbstractControl): ValidationErrors | null {
    const passwordCurrent = form.get('passwordCurrent')?.value;
    const password = form.get('password')?.value;

    if (passwordCurrent || password) {
      if (!passwordCurrent || !password) {
        return { missingPasswordFields: true };
      }
      
      if (passwordCurrent === password) {
        return { sameAsCurrent: true };
      }
    }
    return null;
  }

  onImagePicked(event: Event) {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      if (!file.type.match('image.*')) {
        return;
      }
  
      this.profileForm.patchValue({ profileImage: file });
      this.profileForm.get('profileImage')?.markAsDirty();
  
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.imagePreview = 'logos/user-profile.jpg';
    this.profileForm.patchValue({ profileImage: null });
    this.profileForm.get('profileImage')?.markAsDirty();
  }

  onSubmit() {
    if (this.isFormValid()) {
      const formData = new FormData();
      const formValues = this.profileForm.getRawValue();
    
      formData.append('name', formValues.name);
      formData.append('phoneNumber', formValues.phoneNumber);
    
      if (formValues.passwordCurrent && formValues.password) {
        formData.append('passwordCurrent', formValues.passwordCurrent);
        formData.append('password', formValues.password);
      }
    
      const profileImageControl = this.profileForm.get('profileImage');
      
      if (profileImageControl?.dirty && profileImageControl.value === null) {
        const emptyFile = new File([""], "", { type: "image/jpeg" });
        formData.append('profileImage', emptyFile);
      } 
      else if (profileImageControl?.value instanceof File) {
        formData.append('profileImage', profileImageControl.value, profileImageControl.value.name);
      }
    
      this.isLoading = true;
      this.userService.updateMeUserData(formData).subscribe({
        next: (res) => {
          this.toastService.success(this.translate.instant('Pages.Auth.My_Edit_Acc_Page.Toasts.Successful.Title'), this.translate.instant('Pages.Auth.My_Edit_Acc_Page.Toasts.Successful.Message'));
          this.isLoading = false;

          this.profileForm.patchValue({
            passwordCurrent: '',
            password: ''
          });
        },
        error: (err) => {
          this.toastService.error(this.translate.instant('Pages.Auth.My_Edit_Acc_Page.Toasts.Errors.Title'), this.translate.instant('Pages.Auth.My_Edit_Acc_Page.Toasts.Errors.Message'));
          this.isLoading = false;
        }
      });
    } else {
      this.profileForm.markAllAsTouched();
      this.toastService.info(this.translate.instant('Pages.Auth.My_Edit_Acc_Page.Toasts.Info.Title'), this.translate.instant('Pages.Auth.My_Edit_Acc_Page.Toasts.Info.Message'));
    }
  }

  isFormValid(): boolean {
    const basicFieldsValid =
      (this.profileForm.get('name')?.valid ?? false) &&
      (this.profileForm.get('phoneNumber')?.valid ?? false);

    const passwordCurrent = this.profileForm.get('passwordCurrent')?.value;
    const password = this.profileForm.get('password')?.value;

    if (passwordCurrent || password) {
      const passwordFieldsValid = 
        passwordCurrent && password &&
        !this.profileForm.hasError('missingPasswordFields') &&
        !this.profileForm.hasError('sameAsCurrent') &&
        (this.profileForm.get('passwordCurrent')?.valid ?? false) &&
        (this.profileForm.get('password')?.valid ?? false);

      return basicFieldsValid && passwordFieldsValid;
    }

    return basicFieldsValid;
  }
}