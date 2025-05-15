import { Component, inject, computed } from '@angular/core';
import { ProductsService } from '../../../../../../core/services/products/products.service';
import { Product } from '../../../../../../core/models/products/product.model';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from "../../../../../../shared/components/buttons/dashboard-btn.component";
import { DataTableComponent } from "../../../../../../shared/components/data-table/data-table.component";
import { Column } from '../blogs/admin-blogs.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SectionSpinnerComponent } from "../../../../../../shared/components/spinner/spinner-loading.component";
import { ImportsModule } from '../../../../../../shared/components/data-table/imports';
import { ToastService } from '../../../../../../shared/services/toast-notification/tost-notification.service';
import { ExportToExelButtonComponent } from "../../../../../../shared/components/buttons/export-to-exel.component";
import { ExcelExportService } from '../../../../../../shared/services/export_to_exel/export-to-exel.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, CustomButtonComponent, DataTableComponent, TranslateModule, SectionSpinnerComponent, ImportsModule, ExportToExelButtonComponent],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent  {
  private productsService = inject(ProductsService);
  private translate = inject(TranslateService);
  private toastService = inject(ToastService);
  private exportExelService = inject(ExcelExportService)

  // Reactive computed products
  allProducts = computed<Product[]>(() => this.productsService.getProductsSignal()());
  isLoading: boolean = false;
  showDialog = false;
  imgPreview: string | null = null;

  // Column Definitions for Table
  columns: Column[] = [
    { field: 'name', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Products.Data_Table.Rows.Product_Name'), type: 'text' },
    { field: 'price', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Products.Data_Table.Rows.Product_Price'), type: 'text' },
    { field: 'discount', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Products.Data_Table.Rows.Product_Discount'), type: 'percent' },
    { field: 'category', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Products.Data_Table.Rows.Product_Category'), type: 'text' },
    { field: 'productImage', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Products.Data_Table.Rows.Product_Image'), type: 'image' },
  ];

  smallCategories = ['food', 'accessories', 'grooming', 'medicine', 'toys'];
  discounts = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);

  exportOrders(): void {
    this.exportExelService.exportAsExcelFile(this.allProducts(), 'Products');
  }
  // Form data
  form = {
    name: '',
    quantity: '',
    price: '',
    discount: '',
    category: '',
    productImage: null as string | null
  };


  // Show dialog
  onShowDialog(event: any) {
    this.showDialog = true;
  }

    // Handle image upload
  handleImageUpload(event: any) {
    const file = event.files?.[0];
    if (file) {
      this.form.productImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imgPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  resetForm(): void {
    this.form.productImage = null;
    this.imgPreview = null;
    this.form.category = '';
    this.form.name = '';
    this.form.discount = '';
    this.form.price = '';
    this.form.quantity = '';
  }

  // Clear selected image and preview
  removeImage() {
    this.form.productImage = null;
    this.imgPreview = null;
  }

  onAddSerivce() {        
    // 1. Basic validation guard
    if (!this.form.productImage || !this.form.name || !this.form.price || !this.form.quantity) {
      this.toastService.error(this.translate.instant('Dashboard.Admin.Sidebar_Links.Products.Toasts.Errors.Form.Details'));
      return;
    }

    // 2. Prepare form data
    const formData = new FormData();

    formData.append('name', this.form.name);
    formData.append('price', this.form.price);
    formData.append('quantity', this.form.quantity);
    formData.append('discount', this.form.discount);
    formData.append('category', this.form.category);
    formData.append('productImage', this.form.productImage);

    // 3. Set loading state and close dialog
    this.isLoading = true;
    this.showDialog = false;

    // 4. Call the API
    this.productsService.addProduct(formData).subscribe({
      next: (response) => {                
        this.productsService.loadProducts();
        this.toastService.success(this.translate.instant('Dashboard.Admin.Sidebar_Links.Products.Toasts.Success_Res.Title'),this.translate.instant('Dashboard.Admin.Sidebar_Links.Products.Toasts.Success_Res.Message'));
        this.resetForm();
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.error(this.translate.instant('Dashboard.Admin.Sidebar_Links.Products.Toasts.Errors.Error_Res.Title'),this.translate.instant('Dashboard.Admin.Sidebar_Links.Products.Toasts.Errors.Error_Res.Message'));
        this.isLoading = false;
      }
    })
  }

}
