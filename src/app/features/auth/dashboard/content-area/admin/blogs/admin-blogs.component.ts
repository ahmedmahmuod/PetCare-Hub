import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';

// Shared components
import { DataTableComponent } from "../../../../../../shared/components/data-table/data-table.component";
import { ImportsModule } from '../../../../../../shared/components/data-table/imports';
import { CustomButtonComponent } from "../../../../../../shared/components/buttons/dashboard-btn.component";

// Blog store selectors and actions
import { selectBlogs } from '../../../../../../stores/blogs-store/blogs.selector';
import * as BlogsActions from '../../../../../../stores/blogs-store/blogs.actions';
import { SectionSpinnerComponent } from "../../../../../../shared/components/spinner/spinner-loading.component";
import { BlogsService } from '../../../../../../core/services/blogs/blogs.service';
import { ToastService } from '../../../../../../shared/services/toast-notification/tost-notification.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

// Interface for table columns
export interface Column {
  field: string;
  header: string;
  type?: 'text' | 'image';
}

@Component({
  selector: 'app-admin-blogs',
  standalone: true,
  imports: [CommonModule, ImportsModule, DataTableComponent, CustomButtonComponent, SectionSpinnerComponent, TranslateModule],
  templateUrl: './admin-blogs.component.html',
  styleUrl: './admin-blogs.component.css',
})
export class AdminBlogsComponent {
  // Injecting NgRx Store
  private store = inject(Store);
  private blogsService = inject(BlogsService);
  private toastService = inject(ToastService);
  private translate = inject(TranslateService);

  // Blog list observable from the store
  blogs$ = this.store.select(selectBlogs);

  // Data table column definitions
  columns: Column[] = [
    { field: 'description', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Blogs.Data_Table.Rows.Desc'), type: 'text' },
    { field: 'plogImage', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Blogs.Data_Table.Rows.Img'), type: 'image' }
  ];

  // Dialog visibility flag
  showDialog: boolean = false;

  // Form data
  form = {
    description: '',
    link: '',
    plogImage: null as File | null,
    imgPreview: null as string | null
  };

  isLoading: boolean = false;

  constructor() {
    // Dispatch loadBlogs only if the store is empty
    this.blogs$.pipe(take(1)).subscribe(blogs => {
      if (!blogs || blogs.length === 0) {
        this.store.dispatch(BlogsActions.loadBlogs());
      }
    });
  }

  // Show dialog when user clicks "Add blog"
  onShowDialog(event: any) {
    this.showDialog = true;
  }

  // Handle image selection and preview
  handleImageUpload(event: any) {
    const file = event.files?.[0];
    if (file) {
      this.form.plogImage = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.form.imgPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Clear selected image and preview
  removeImage() {
    this.form.plogImage = null;
    this.form.imgPreview = null;
  }

  onAddBlog() {
    // 1. Basic validation guard
    if (!this.form.description || !this.form.link || !this.form.plogImage) {
      this.toastService.error('All fields are required.');
      return;
    }

    // 2. Prepare form data
    const formData = new FormData();
    formData.append('description', this.form.description);
    formData.append('link', this.form.link);
    formData.append('plogImage', this.form.plogImage);

    // 3. Set loading state and close dialog
    this.isLoading = true;
    this.showDialog = false;

    // 4. Call the API
    this.blogsService.createLog(formData).subscribe({
      next: (res) => {
        // Optional: success toast
        this.toastService.success(this.translate.instant('Dashboard.Admin.Sidebar_Links.Blogs.Add_New_Blog.Toasts.Successful.Title'), this.translate.instant('Dashboard.Admin.Sidebar_Links.Blogs.Add_New_Blog.Toasts.Successful.Message'));

        // Refresh blog list
        this.store.dispatch(BlogsActions.loadBlogs());

        // Reset form
        this.resetForm();

        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.toastService.error(this.translate.instant('Dashboard.Admin.Sidebar_Links.Blogs.Add_New_Blog.Toasts.Errors.Title'),this.translate.instant('Dashboard.Admin.Sidebar_Links.Blogs.Add_New_Blog.Toasts.Errors.Message'));
      }
    });
  }

  // reset the form
  resetForm() {
    this.form = {
      description: '',
      link: '',
      plogImage: null,
      imgPreview: null
    };
  }


}
