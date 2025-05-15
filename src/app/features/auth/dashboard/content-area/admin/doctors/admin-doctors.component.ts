import { Component, inject, OnInit } from '@angular/core';
import { VetsService } from '../../../../../../core/services/veterinary/veterinary.service';
import { CustomButtonComponent } from "../../../../../../shared/components/buttons/dashboard-btn.component";
import { DataTableComponent } from "../../../../../../shared/components/data-table/data-table.component";
import { Column } from '../blogs/admin-blogs.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../../../../../shared/services/toast-notification/tost-notification.service';
import { SectionSpinnerComponent } from "../../../../../../shared/components/spinner/spinner-loading.component";
import { ImportsModule } from '../../../../../../shared/components/data-table/imports';
import { ExportToExelButtonComponent } from "../../../../../../shared/components/buttons/export-to-exel.component";
import { ExcelExportService } from '../../../../../../shared/services/export_to_exel/export-to-exel.service';

@Component({
  selector: 'app-admin-doctors',
  standalone: true,
  imports: [ImportsModule, CustomButtonComponent, DataTableComponent, TranslateModule, SectionSpinnerComponent, ExportToExelButtonComponent],
  templateUrl: './admin-doctors.component.html',
  styleUrl: './admin-doctors.component.css'
})
export class AdminDoctorsComponent implements OnInit{
  private vetServices = inject(VetsService);
  private translate = inject(TranslateService);
  private toastService = inject(ToastService);
  private exportExelService = inject(ExcelExportService)

  ngOnInit(): void {
    this.vetServices.loadDoctors();
  }

  get doctors() {
   return this.vetServices.allDoctors();
  }

  exportOrders(): void {
    this.exportExelService.exportAsExcelFile(this.doctors, 'Doctors');
  }

  showDialog = false;
  isLoading: boolean = false;
  imgPreview: string | null = null;

  // Column Definitions for Table
  columns: Column[] = [
    { field: 'name', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Doctors.Data_Table.Rows.Doctor_Name'), type: 'text' },
    { field: 'rate', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Doctors.Data_Table.Rows.Doctor_Rate'), type: 'text' },
    { field: 'doctorImage', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Doctors.Data_Table.Rows.Doctor_Image'), type: 'image' },
  ];

  // Form data
  form = {
    name: '',
    about: '',
    phone: '',
    description: '',
    accepted_pet_types: '',
    specialized_in: '',
    doctorImage: null as string | null,
    imagesProfile: [] as File[]
  };

  petOptions = [
    { label: this.translate.instant('Dashboard.Admin.Sidebar_Links.Doctors.Form.Accepted_Pets.Options.Dogs'), value: 'dogs' },
    { label: this.translate.instant('Dashboard.Admin.Sidebar_Links.Doctors.Form.Accepted_Pets.Options.Cats'), value: 'cats' }
  ];

  isPhoneValid(): boolean {
    return /^01[0-9]{9}$/.test(this.form.phone);
  }

  // Doctor Gallary
  handleImageGalleryUpload(event: any) {
    const files: File[] = event.files;
    for (let file of files) {
      this.form.imagesProfile.push(file); 
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  }

  // Handle image upload
  handleImageUpload(event: any) {
    const file = event.files?.[0];
    if (file) {
      this.form.doctorImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imgPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Clear selected image and preview
  removeImage() {
    this.form.doctorImage = null;
    this.imgPreview = null;
  }

  resetForm(): void {
    this.form = {
      name: '',
      about: '',
      phone: '',
      description: '',
      accepted_pet_types: '',
      specialized_in: '',
      doctorImage: null,
      imagesProfile: []
    };

    this.imgPreview = null;
  }

  // Show dialog
  onShowDialog(event: any) {
    this.showDialog = true;
  }

  // On add doctor
  onAddDoctor() {    
    // 1. Basic validation guard
    if (!this.form.doctorImage || !this.form.name || !this.form.description) {
      return;
    }

    // 2. Prepare form data
    const formData = new FormData();

    formData.append('name', this.form.name);
    formData.append('description', this.form.description);
    formData.append('doctorImage', this.form.doctorImage!); 
    formData.append('phone', this.form.phone);
    formData.append('about', this.form.about);
    formData.append('specialized_in', this.form.specialized_in);
    formData.append('accepted_pet_types', this.form.accepted_pet_types);
    this.form.imagesProfile.forEach(file => {
      formData.append('imagesProfile', file);
    });

    // 3. Set loading state and close dialog
    this.isLoading = true;
    this.showDialog = false;
    
    // 4. Call the API 
    this.vetServices.addDoctor(formData).subscribe({
      next: (response) => {
        this.toastService.success(this.translate.instant('Dashboard.Admin.Sidebar_Links.Doctors.Toasts.Successful.Title'), this.translate.instant('Dashboard.Admin.Sidebar_Links.Doctors.Toasts.Successful.Message'));
        this.isLoading = false;
        this.resetForm()
      },
      
      error: (error) => {
        this.toastService.error(this.translate.instant('Dashboard.Admin.Sidebar_Links.Doctors.Toasts.Errors.Title'), this.translate.instant('Dashboard.Admin.Sidebar_Links.Doctors.Toasts.Errors.Message'));
        this.isLoading = false;
        this.resetForm()
      }
    })
  }
}
