import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [ImportsModule, CustomButtonComponent, DataTableComponent, TranslateModule, SectionSpinnerComponent],
  templateUrl: './admin-services.component.html',
  styleUrl: './admin-services.component.css',
})
export class AdminServicesComponent implements OnInit {
  // Injected Services
  private serviceServices = inject(ServicesService);
  private translate = inject(TranslateService);
  private toastService = inject(ToastService);

  constructor(private fb: FormBuilder, private messageService: MessageService) {

  }

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
    { field: 'serviceType', header: 'Service Type', type: 'text' },
    { field: 'rate', header: 'Service Rate', type: 'text' },
    { field: 'city', header: 'Service City', type: 'text' },
    { field: 'serviceImage', header: 'Service Image', type: 'image' },
  ];

  // Select Options
  serviceTypes = [
    'Pet Training',
    'Pet Grooming',
    'Pet Boarding',
    'Pet Hotel',
    'Pet Care',
    'Pet Sitting',
    'Pet Taxi',
    'Pet Walking'
  ];

  pricePerOptions = ['night', 'day', 'week', 'month'];

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
      this.toastService.error('All fields are required.');
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
        this.toastService.success('Successfuly', 'Service created successfuly!');
        this.resetForm();
        this.isLoading = false;
      }, 
      error: (err) => { 
        console.log(err);
        this.toastService.error('Error', 'Failed to create service!');
        this.isLoading = false;
      }
    });
  }



}
