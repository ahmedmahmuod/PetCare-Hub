import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ServicesService } from './../../../../../../core/services/services/services.service';
import { MessageService } from 'primeng/api';

import { CustomButtonComponent } from '../../../../../../shared/components/buttons/dashboard-btn.component';
import { DataTableComponent } from '../../../../../../shared/components/data-table/data-table.component';
import { ImportsModule } from '../../../../../../shared/components/data-table/imports';
import { Column } from '../blogs/admin-blogs.component';
import { ServiceModel } from '../../../../../../core/models/service/service.model';
import { ToastService } from '../../../../../../shared/services/toast-notification/tost-notification.service';
import { SectionSpinnerComponent } from "../../../../../../shared/components/spinner/spinner-loading.component";
import { ExportToExelButtonComponent } from "../../../../../../shared/components/buttons/export-to-exel.component";
import { ExcelExportService } from '../../../../../../shared/services/export_to_exel/export-to-exel.service';

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [ImportsModule, CustomButtonComponent, DataTableComponent, TranslateModule, SectionSpinnerComponent, ExportToExelButtonComponent],
  templateUrl: './admin-services.component.html',
  styleUrl: './admin-services.component.css',
})
export class AdminServicesComponent implements OnInit {
  // Injected Services
  private serviceServices = inject(ServicesService);
  private translate = inject(TranslateService);
  private toastService = inject(ToastService);
  private exportExelService = inject(ExcelExportService)

  constructor(private fb: FormBuilder, private messageService: MessageService) {}
  
  // Signals
  services = signal<ServiceModel[]>([]);
  showDialog = false;
  imgPreview: string | null = null;
  uploadedFiles: File[] = [];

  // Reactive Form
  petServiceForm!: FormGroup;
  submitted = false;
  loading = false;

  // Column Definitions for Table
  columns: Column[] = [
    { field: 'serviceType', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Data_Table.Rows.Service_Type'), type: 'text' },
    { field: 'rate', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Data_Table.Rows.Service_Rate'), type: 'text' },
    { field: 'city', header:  this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Data_Table.Rows.Service_City'), type: 'text' },
    { field: 'serviceImage', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Data_Table.Rows.Service_Image'), type: 'image' },
  ];

  exportOrders(): void {
    this.exportExelService.exportAsExcelFile(this.serviceServices.allServices(), 'Services');
  }

  // Select Options
  serviceTypes = [
    this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Form.Service_Type.Options.Training'),
    this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Form.Service_Type.Options.Grooming'),
    this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Form.Service_Type.Options.Boarding'),
    this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Form.Service_Type.Options.Hotel'),
    this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Form.Service_Type.Options.Care'),
    this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Form.Service_Type.Options.Sitting'),
    this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Form.Service_Type.Options.Taxi'),
    this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Form.Service_Type.Options.Walking'),
  ];

  pricePerOptions = [
    this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Form.Price_Per.Options.Night'),
    this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Form.Price_Per.Options.Day'),
    this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Form.Price_Per.Options.Week'),
    this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Form.Price_Per.Options.Month'),
  ];

  // Form data
  form = {
    serviceType: null,
    city: '',
    about: '',
    price: null,
    pricePer: null,
    serviceImage: null as string | null
};


  isLoading: boolean = false;
  formErrors: any = {};

  ngOnInit(): void {
    this.serviceServices.getAllServices();
  }

  private servicesEffect = effect(() => {
    const all = this.serviceServices.allServices();
    if (all.length > 0) {
      const filtered = all.filter(s => s.serviceImage);
      this.services.set(filtered);
    }
  }, { allowSignalWrites: true });

  // Show dialog
  onShowDialog(event: any) {
    this.showDialog = true;
  }

  // Handle image upload
  handleImageUpload(event: any) {
    const file = event.files?.[0];
    if (file) {
      this.form.serviceImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imgPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Clear selected image and preview
  removeImage() {
    this.form.serviceImage = null;
    this.imgPreview = null;
  }

  resetForm(): void {
    this.form.serviceImage = null;
    this.imgPreview = null;
    this.submitted = false;
    this.formErrors = {};
  }


  onAddSerivce() {
    console.log(this.form);
    
    // 1. Basic validation guard
    if (!this.form.serviceImage || !this.form.price || !this.form.pricePer || !this.form.serviceType) {
      this.toastService.error(this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Toasts.Errors.Form.Error'));
      return;
    }

    // 2. Prepare form data
    const formData = new FormData();
    formData.append('serviceType', this.form.serviceType);
    formData.append('city', this.form.city);
    formData.append('price', this.form.price);
    formData.append('pricePer', this.form.pricePer);
    formData.append('about', this.form.about);
    formData.append('serviceImage', this.form.serviceImage);

    // 3. Set loading state and close dialog
    this.isLoading = true;
    this.showDialog = false;

    // 4. Call the API
    this.serviceServices.createService(formData).subscribe({
      next: (res) => {
        console.log(res);
        
        // Optional: success toast
        this.serviceServices.getAllServices();
        this.toastService.success(this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Toasts.Successful.Title'), this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Toasts.Successful.Message'));
        this.resetForm();
        this.isLoading = false;
      }, 
      error: (err) => { 
        console.log(err);
        this.toastService.error(this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Toasts.Errors.Error_Res.Title'), this.translate.instant('Dashboard.Admin.Sidebar_Links.Services.Toasts.Errors.Error_Res.Message'));
        this.isLoading = false;
      }
    });
  }



}
