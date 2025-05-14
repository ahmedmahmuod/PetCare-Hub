import { Component, computed, inject, OnInit } from '@angular/core';
import { ImportsModule } from '../../../../../../shared/components/data-table/imports';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PetsService } from '../../../../../../core/services/pets/pets.services';
import { Pet } from '../../../../../../core/models/pets/pet.model';
import { SectionSpinnerComponent } from "../../../../../../shared/components/spinner/spinner-loading.component";
import { CustomButtonComponent } from "../../../../../../shared/components/buttons/dashboard-btn.component";
import { DataTableComponent } from "../../../../../../shared/components/data-table/data-table.component";
import { Column } from '../../admin/blogs/admin-blogs.component';
import { ToastService } from '../../../../../../shared/services/toast-notification/tost-notification.service';

@Component({
  selector: 'app-user-pets',
  standalone: true,
  imports: [ImportsModule, TranslateModule, SectionSpinnerComponent, CustomButtonComponent, DataTableComponent],
  templateUrl: './user-pets.component.html',
  styleUrl: './user-pets.component.css',
})
export class UserPetsComponent implements OnInit {
  private petsService = inject(PetsService);
  private translate = inject(TranslateService);
  private toastService = inject(ToastService);
  
  allMyPets = computed<Pet[]>(() => this.petsService.myPets());
  isLoading: boolean = false;
  showDialog: boolean = false;
  imgPreview: string | null = null;

  // Column Definitions for Table
  columns: Column[] = [
    { field: 'name', header: this.translate.instant('Dashboard.User.My_Pets.Data_Table.Columns.Pet_Name'), type: 'text' },
    { field: 'type', header: this.translate.instant('Dashboard.User.My_Pets.Data_Table.Columns.Pet_Type'), type: 'text' },
    { field: 'gender', header: this.translate.instant('Dashboard.User.My_Pets.Data_Table.Columns.Pet_Gender'), type: 'text' },
    { field: 'weight', header: this.translate.instant('Dashboard.User.My_Pets.Data_Table.Columns.Pet_Weight'), type: 'text' },
    { field: 'petImage', header: this.translate.instant('Dashboard.User.My_Pets.Data_Table.Columns.Pet_Image'), type: 'image' },
  ];

  petTypeOptions = [
    { label: this.translate.instant('Dashboard.User.My_Pets.Form.Pet_Type.Options.Dog'), value: 'dog' },
    { label: this.translate.instant('Dashboard.User.My_Pets.Form.Pet_Type.Options.Cat'), value: 'cat' },
  ];

  petGenderOptions = [
    { label: this.translate.instant('Dashboard.User.My_Pets.Form.Pet_Gender.Options.Male'), value: 'male' },
    { label: this.translate.instant('Dashboard.User.My_Pets.Form.Pet_Gender.Options.Female'), value: 'female' }
  ];

  // Form data
  form = {
    name: '',
    type: '',
    gender: '',
    weight: 0 as number,
    petImage: null as File | string | null
  };

  addSubmet: boolean = true;
  petId = '';
  formData = new FormData();

  ngOnInit(): void {
    this.petsService.getMyPets();    
  }

  // Show dialog
  onShowDialog(event: any) {
    this.resetForm();
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
    this.addSubmet = true;
    this.resetForm();
  }

  // Handle image upload
  handleImageUpload(event: any) {
    const file = event.files?.[0];
    if (file) {
      this.form.petImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imgPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  resetForm(): void {
    this.form = {
      name: '',
      type: '',
      gender: '',
      weight: 0,
      petImage: null
    };
    this.imgPreview = null;
    this.formData = new FormData();
  }

  // Clear selected image and preview
  removeImage() {
    this.form.petImage = null;
    this.imgPreview = null;
  }

  // Add new pet
  onAddSerivce() {                
    if (!this.form.petImage || !this.form.name || !this.form.gender || !this.form.type || !this.form.weight) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.form.name);
    formData.append('type', this.form.type);
    formData.append('gender', this.form.gender);
    formData.append('weight', this.form.weight.toString());
    
    if (this.form.petImage instanceof File) {
      formData.append('petImage', this.form.petImage);
    } else if (typeof this.form.petImage === 'string') {
      formData.append('petImage', this.form.petImage);
    }

    this.isLoading = true;
    this.showDialog = false;
    
    this.petsService.addPetToMyPets(formData).subscribe({
      next: (response) => {
        this.petsService.getMyPets();    
        this.isLoading = false;
        this.toastService.success(this.translate.instant('Dashboard.User.My_Pets.Toasts.Add_Pet.Success.Title'), this.translate.instant('Dashboard.User.My_Pets.Toasts.Add_Pet.Success.Message'));
        this.closeDialog()      
      },
      error: (error) => {
        this.isLoading = false;
        this.toastService.error(this.translate.instant('Dashboard.User.My_Pets.Toasts.Add_Pet.Error.Title'), this.translate.instant('Dashboard.User.My_Pets.Toasts.Add_Pet.Error.Message'),);
        this.closeDialog()      
      }
    });
  }
  
  // Delete pet from my pets
  deletePet(pet: Pet) {
    this.isLoading = true;
    this.petsService.deleteMyPet(pet._id ?? '').subscribe({
      next: (response) => {
        this.petsService.getMyPets();
        this.isLoading = false;
        this.toastService.success(this.translate.instant('Dashboard.User.My_Pets.Toasts.Delete_Pet.Success.Title'), this.translate.instant('Dashboard.User.My_Pets.Toasts.Delete_Pet.Success.Message'));
        
      },
      error: (error) => {
        this.isLoading = false;
        this.toastService.error(this.translate.instant('Dashboard.User.My_Pets.Toasts.Delete_Pet.Error.Title'), this.translate.instant('Dashboard.User.My_Pets.Toasts.Delete_Pet.Error.Message'));
      }
    })
  }
  
  // Edit pet
  editPet(pet: Pet) {     
    this.addSubmet = false;
    this.resetForm();

    this.form = {
      name: pet.name,
      gender: pet.gender,
      type: pet.type,
      petImage: pet.petImage,
      weight: pet.weight
    };

    this.imgPreview = typeof this.form.petImage === 'string' ? this.form.petImage : null;
    this.petId = pet._id ?? '';
    this.showDialog = true;
  }

  updatePet() {    
    this.isLoading = true;
    this.showDialog = false;

    // Create new FormData for each update
    const updateFormData = new FormData();
    updateFormData.append('name', this.form.name);
    updateFormData.append('gender', this.form.gender);
    updateFormData.append('type', this.form.type);
    updateFormData.append('weight', this.form.weight.toString());

    // Handle image cases
    if (this.form.petImage instanceof File) {
      updateFormData.append('petImage', this.form.petImage);
    } else if (typeof this.form.petImage === 'string') {
      updateFormData.append('petImage', this.form.petImage);
    } else {
      // If image was removed
      updateFormData.append('petImage', '');
    }

    this.petsService.editMyPet(this.petId, updateFormData).subscribe({
      next: (response) => {
        this.petsService.getMyPets();    
        this.isLoading = false;
        this.toastService.success(this.translate.instant('Dashboard.User.My_Pets.Toasts.Update_Pet.Success.Title'), this.translate.instant('Dashboard.User.My_Pets.Toasts.Update_Pet.Success.Message'));
        this.resetForm();
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
        this.toastService.error(this.translate.instant('Dashboard.User.My_Pets.Toasts.Update_Pet.Error.Title'), this.translate.instant('Dashboard.User.My_Pets.Toasts.Update_Pet.Error.Message'));
        this.resetForm();
      }
    });     
    this.addSubmet = true;
  }
}