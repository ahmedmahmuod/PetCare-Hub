import { transition } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { VetsService } from '../../../../../../core/services/veterinary/veterinary.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../../../../../shared/services/toast-notification/tost-notification.service';
import { CustomButtonComponent } from "../../../../../../shared/components/buttons/dashboard-btn.component";
import { DataTableComponent } from "../../../../../../shared/components/data-table/data-table.component";
import { Column } from '../blogs/admin-blogs.component';
import { SectionSpinnerComponent } from "../../../../../../shared/components/spinner/spinner-loading.component";
import { ImportsModule } from '../../../../../../shared/components/data-table/imports';

@Component({
  selector: 'app-admin-clinics',
  standalone: true,
  imports: [CustomButtonComponent, DataTableComponent, TranslateModule, SectionSpinnerComponent, ImportsModule],
  templateUrl: './admin-clinics.component.html',
  styleUrl: './admin-clinics.component.css'
})
export class AdminClinicsComponent {
  private vetServices = inject(VetsService);
  private translate = inject(TranslateService);
  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.vetServices.loadClinics();
  }

  get clinics() {
   return this.vetServices.allClinics();
  }

  showDialog = false;
  isLoading: boolean = false;
  imgPreview: string | null = null;

  // Form data
  form = {
    vetName: '',
    bio: '',
    locations: {
      coordinates: [30.17192323375665, 31.269752217838537],
      address: ''
    },
    callNumber: '',
    desc: '',
    vetImage: null as string | null,
  };

    // Column Definitions for Table
  columns: Column[] = [
    { field: 'vetName', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Clinics.Data_Table.Rows.Clinic_Name'), type: 'text' },
    { field: 'rate', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Clinics.Data_Table.Rows.Clinic_Rate'), type: 'text' },
    { field: 'vetImage', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Clinics.Data_Table.Rows.Clinic_Image'), type: 'image' },
  ];

  clinicType = [this.translate.instant('Dashboard.Admin.Sidebar_Links.Clinics.Form.Clinic_Type.Options.Pet_Clinic'), this.translate.instant('Dashboard.Admin.Sidebar_Links.Clinics.Form.Clinic_Type.Options.Veterinary_Clinic')]

  // Show dialog
  onShowDialog(event: any) {
    this.showDialog = true;
  }

    // Handle image upload
  handleImageUpload(event: any) {
    const file = event.files?.[0];
    if (file) {
      this.form.vetImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imgPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Clear selected image and preview
  removeImage() {
    this.form.vetImage = null;
    this.imgPreview = null;
  }

  resetForm(): void {
    this.form = {
      vetName: '',
      bio: '',
      callNumber: '',
      locations: {
        coordinates: [],
        address: ''
      },
      desc: '',
      vetImage: null,
    };

    this.imgPreview = null;
  }

  // On add doctor
  onAddDoctor() {   
    // 1. Basic validation guard
    if (!this.form.vetImage || !this.form.vetName || !this.form.callNumber || !this.form.bio || !this.form.locations) {
      return;
    }

    // 2. Prepare form data
    const formData = new FormData();
    formData.append('vetName', this.form.vetName);
    formData.append('bio', this.form.bio);
    formData.append('callNumber', this.form.callNumber);
    formData.append('locations[address]', this.form.locations.address);    
    formData.append('locations[coordinates]', this.form.locations.coordinates.toString());    
    formData.append('desc', this.form.desc);
    formData.append('vetImage', this.form.vetImage);

    // 3. Set loading state and close dialog
    this.isLoading = true;
    this.showDialog = false;
    
    // 4. Call the API 
    this.vetServices.addClinic(formData).subscribe({
      next: (response) => {
        this.vetServices.loadClinics();
        this.toastService.success(this.translate.instant('Dashboard.Admin.Sidebar_Links.Clinics.Toasts.Successful.Title'), this.translate.instant('Dashboard.Admin.Sidebar_Links.Clinics.Toasts.Successful.Message'));
        this.isLoading = false;
        this.resetForm()
      },
      
      error: (error) => {
        this.toastService.error(this.translate.instant('Dashboard.Admin.Sidebar_Links.Clinics.Toasts.Errors.Title'), this.translate.instant('Dashboard.Admin.Sidebar_Links.Clinics.Toasts.Errors.Message'));
        this.isLoading = false;
        this.resetForm()
      }
    })
  }

}
