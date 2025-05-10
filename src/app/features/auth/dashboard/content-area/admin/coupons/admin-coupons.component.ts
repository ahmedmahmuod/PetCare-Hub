import { Component, computed, inject, OnInit } from '@angular/core';
import { CustomButtonComponent } from "../../../../../../shared/components/buttons/dashboard-btn.component";
import { DataTableComponent } from "../../../../../../shared/components/data-table/data-table.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Column } from '../blogs/admin-blogs.component';
import { CouponsService } from '../../../../../../core/services/coupon/coupons.service';
import { ImportsModule } from '../../../../../../shared/components/data-table/imports';
import { SectionSpinnerComponent } from "../../../../../../shared/components/spinner/spinner-loading.component";
import { ToastService } from '../../../../../../shared/services/toast-notification/tost-notification.service';

@Component({
  selector: 'app-admin-coupons',
  standalone: true,
  imports: [CustomButtonComponent, DataTableComponent, TranslateModule, ImportsModule, SectionSpinnerComponent],
  templateUrl: './admin-coupons.component.html',
  styleUrl: './admin-coupons.component.css'
})
export class AdminCouponsComponent implements OnInit {
  private translate = inject(TranslateService);
  private couponService = inject(CouponsService);
  private toastService = inject(ToastService);
  
  coupons = computed(() => this.couponService.allCoupons());
  isLoading: boolean = false;
  showDialog = false;
  
  
  ngOnInit(): void {
    this.couponService.getAllCoupons();    
  }

  // Form data
  form = {
    name: '',
    discount: '',
    expire: null as Date | null
  }
  
  // Column Definitions for Table
  columns: Column[] = [
    { field: 'name', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Coupons.Data_Table.Rows.Coupon_Name'), type: 'text' },
    { field: 'discount', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Coupons.Data_Table.Rows.Coupon_Discount'), type: 'percent' },
    { field: 'expire', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Coupons.Data_Table.Rows.Coupon_Expire'), type: 'date' },
    { field: 'createdAt', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Coupons.Data_Table.Rows.Coupon_Created'), type: 'date' },
  ];

  discounts = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);

    // Show dialog
  onShowDialog(event: any) {
    this.showDialog = true;
  }

 onAddCoupon() {
  if (!this.form.name || !this.form.discount || !this.form.expire) {
    this.toastService.error(this.translate.instant('Dashboard.Admin.Sidebar_Links.Coupons.Toasts.Errors.Form.Details'));
    return;
  }

  const payload = {
    name: this.form.name,
    discount: this.form.discount,
    expire: this.form.expire instanceof Date
      ? this.form.expire.toISOString().split('T')[0]
      : this.form.expire
  };

  console.log(payload);
  
  this.isLoading = true;
  this.showDialog = false;

  this.couponService.createCoupon(payload).subscribe({
    next: (response) => {
      this.couponService.getAllCoupons();
      this.toastService.success(this.translate.instant('Dashboard.Admin.Sidebar_Links.Coupons.Toasts.Success_Res.Title'),this.translate.instant('Dashboard.Admin.Sidebar_Links.Coupons.Toasts.Success_Res.Message'));
      this.isLoading = false;

      // Reset form
      this.form = {
        name: '',
        discount: '',
        expire: null
      };
    },
    error: (error) => {
      this.toastService.error(this.translate.instant('Dashboard.Admin.Sidebar_Links.Coupons.Toasts.Errors.Error_Res.Title'), this.translate.instant('Dashboard.Admin.Sidebar_Links.Coupons.Toasts.Errors.Error_Res.Message'));
      this.isLoading = false;
    }
  });
}

}
