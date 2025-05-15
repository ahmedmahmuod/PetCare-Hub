import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../../../../../core/services/user/users.service';
import { DataTableComponent } from "../../../../../../shared/components/data-table/data-table.component";
import { Column } from '../blogs/admin-blogs.component';
import { CustomButtonComponent } from "../../../../../../shared/components/buttons/dashboard-btn.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SectionSpinnerComponent } from "../../../../../../shared/components/spinner/spinner-loading.component";
import { ImportsModule } from '../../../../../../shared/components/data-table/imports';
import { ToastService } from '../../../../../../shared/services/toast-notification/tost-notification.service';
import { AuthService } from '../../../../../../core/services/auth/logs/user-loging.service';
import { ExportToExelButtonComponent } from "../../../../../../shared/components/buttons/export-to-exel.component";
import { ExcelExportService } from '../../../../../../shared/services/export_to_exel/export-to-exel.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [DataTableComponent, CustomButtonComponent, TranslateModule, SectionSpinnerComponent, ImportsModule, ExportToExelButtonComponent],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent implements OnInit{
  private usersService = inject(UsersService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService)
  private translate = inject(TranslateService)
  private exportExelService = inject(ExcelExportService)
  
  // Column Definitions for Table
  columns: Column[] = [
    { field: 'name', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Users.Data_Table.Rows.User_Name'), type: 'text' },
    { field: 'email', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Users.Data_Table.Rows.Email'), type: 'text' },
    { field: 'role', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Users.Data_Table.Rows.Role'), type: 'text' },
    { field: 'profileImage', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Users.Data_Table.Rows.User_Image'), type: 'image' },
    { field: 'createdAt', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Users.Data_Table.Rows.Join_In'), type: 'date' },
  ];

  exportOrders(): void {
    this.exportExelService.exportAsExcelFile(this.allUsers, 'Users');
  }

  stateOptions: any[] = [{ label: this.translate.instant('Dashboard.Admin.Sidebar_Links.Users.Form.Role.Options.Admin'), value: 'admin' },{ label: this.translate.instant('Dashboard.Admin.Sidebar_Links.Users.Form.Role.Options.User'), value: 'user' }];
  isLoading: boolean = false;
  showDialog = false;

  // Form data
  form = {
    name: '' as string | null,
    email: '' as string | null,
    password: '' as string | null,
    role: 'user',
  };

  ngOnInit(): void {
    this.usersService.getAllUsers();  
  }

  get allUsers() {
    return this.usersService.allUsers();
  }


  // Show dialog
  onShowDialog(event: any) {
    this.showDialog = true;
  }

  resetForm(): void {
    this.form.email = null;
    this.form.password = null;
    this.form.email = null;
  }

  onAddSerivce() {    
    // 1. Basic validation guard
    if (!this.form.name || !this.form.email || !this.form.password || !this.form.role) {
      return;
    }

    // 3. Set loading state and close dialog
    this.isLoading = true;
    this.showDialog = false;

    // 4. Call the API
    this.authService.signUp(this.form).subscribe({
      next: (response) => {        
        console.log(response);
        this.usersService.getAllUsers();
        this.toastService.success(this.translate.instant('Dashboard.Admin.Sidebar_Links.Users.Toasts.Successful.Title'),('Dashboard.Admin.Sidebar_Links.Users.Toasts.Successful.Message'));
        this.resetForm();
        this.isLoading = false;
      },
      error: (error) => {        
        if (error.error.error.statusCode === 401) {
          this.toastService.error(this.translate.instant('Dashboard.Admin.Sidebar_Links.Users.Toasts.Errors.Email_Exist.Title'),this.translate.instant('Dashboard.Admin.Sidebar_Links.Users.Toasts.Errors.Email_Exist.Message'));
        } else {
          this.toastService.error(this.translate.instant('Dashboard.Admin.Sidebar_Links.Users.Toasts.Errors.Error.Title'),this.translate.instant('Dashboard.Admin.Sidebar_Links.Users.Toasts.Errors.Error.Message'));
        }
        this.isLoading = false;
      }
    })
  }

}
