import { Routes } from '@angular/router';
import { AuthRoleGuard } from './core/guards/auth-guards/auth-role-guard.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent), data: { title: 'Page_Titles.Home' } },

  { path: 'services', data: { title: 'Page_Titles.Services' },
    children: [
      { path: '', loadComponent: () => import('./features/ServicesProfile/all-services/all-services.component').then(m => m.AllServicesComponent) },
      { path: ':serviceId', data: { title: 'Page_Titles.Service_Details' }, loadComponent: () => import('./features/ServicesProfile/single-service/single-service.component').then(m => m.SingleServiceComponent) }
  ] },

  { path: 'adoption', data: { disableScroll: true, title: 'Page_Titles.Adoption' }, loadComponent: () => import('./features/adoption/adoption.component').then(m => m.AdoptionComponent), children: [
      { path: 'dogs', loadComponent: () => import('./features/adoption/dogs/dogs.component').then(m => m.DogsComponent) },
      { path: 'cats', loadComponent: () => import('./features/adoption/cats/cats.component').then(m => m.CatsComponent) },
      { path: 'shelters', loadComponent: () => import('./features/adoption/shelters/sehalters.component').then(m => m.SheltersListComponent) }
  ]},
  { path: 'adoption/shelters/:shelterId', data: { title: 'Page_Titles.Shelter_Details' }, loadComponent: () => import('./features/adoption/shelters/shelter-details/shelter-details.component').then(m => m.ShelterDetailsComponent) },
  { path: 'adoption/:pets', loadComponent: () => import('./features/adoption/pets/pets.component').then(m => m.PetsComponent) },

  { path: 'veterinary', data: { title: 'Page_Titles.Veterinary' }, loadComponent: () => import('./features/vets/vets.component').then(m => m.VetsComponent),
    children: [
      { path: '', loadComponent: () => import('./features/vets/vets-home/vets-home.component').then(m => m.VetsHomeComponent) },
      { path: 'doctors', loadComponent: () => import('./features/vets/doctors/doctors.component').then(m => m.DoctorsComponent) },
      { path: 'clinics', loadComponent: () => import('./features/vets/clinics/clinics.component').then(m => m.ClinicsComponent) },
    ]},
  { path: 'veterinary/doctors/:doctorId', data: { title: 'Page_Titles.Doctor_Details' }, loadComponent: () => import('./features/vets/doctors/doctor-profile/doctor-profile.component').then(m => m.DoctorProfileComponent) },
  { path: 'veterinary/clinics/:clinicsId', data: { title: 'Page_Titles.Clinic_Details' }, loadComponent: () => import('./features/vets/clinics/clinics-profile/clinics-profile.component').then(m => m.ClinicDetailComponent) },
    
  { path: 'blogs', data: { title: 'Page_Titles.Blogs' }, loadComponent: () => import('./features/blogs/blogs.component').then(m => m.BlogsComponent) },
  { path: 'shop', data: { title: 'Page_Titles.Shop' }, loadComponent: () => import('./features/shop/shop.component').then(m => m.ProductListComponent) },
  
  { path: 'community', data: { title: 'Page_Titles.Community' }, loadComponent: () => import('./features/community/community.component').then(m => m.CommunityComponent) },
  { path: 'community/profile/:profileId', data: { title: 'Page_Titles.Profile' }, loadComponent: () => import('./features/user/profile/user-profile.component').then(m => m.UserProfileComponent) },

  { 
    path: 'auth', canActivate: [AuthRoleGuard], data: { expectedRole: null },
    children: [
      { path: 'login', data: { title: 'Page_Titles.Login' }, loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', data: { title: 'Page_Titles.Register' }, loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
      { path: 'forget-password', data: { title: 'Page_Titles.Forget_Password' }, loadComponent: () => import('./features/auth/forget-password/forget-password.component').then(m => m.PasswordResetComponent) }
    ]
  },
  
  // user profile routes
  { path: 'user',  canActivate: [AuthRoleGuard], data: { expectedRole: 'user' },
    children: [
      { path: 'account-details', data: { title: 'Page_Titles.Account_Details' }, canActivate: [AuthRoleGuard], loadComponent: () => import('./features/auth/my-account/my-account.component').then(m => m.MyAccountComponent) },
      { path: 'dashboard', canActivate: [AuthRoleGuard], loadComponent: () => import('./features/auth/dashboard/dashboard.component').then(m => m.DashboardComponent), 
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'pets' },
          { path: 'pets', data: { title: 'Page_Titles.My_Pets' }, loadComponent: () => import('./features/auth/dashboard/content-area/user/my-pets/user-pets.component').then(m => m.UserPetsComponent )},
          { path: 'orders', data: { title: 'Page_Titles.My_Orders' }, loadComponent: () => import('./features/auth/dashboard/content-area/user/my-orders/user-orders.component').then(m => m.UserOrdersComponent )},
        ]
       },
  ]},
    
    // admin profile routes
  { path: 'admin', canActivate: [AuthRoleGuard], data: { expectedRole: 'admin' },
    children: [
      { path: 'account-details', data: { title: 'Page_Titles.Account_Details' }, canActivate: [AuthRoleGuard], loadComponent: () => import('./features/auth/my-account/my-account.component').then(m => m.MyAccountComponent) },
      { path: 'dashboard', canActivate: [AuthRoleGuard],  loadComponent: () => import('./features/auth/dashboard/dashboard.component').then(m => m.DashboardComponent), 
        children: [
          { path: '', data: { title: 'Page_Titles.Dashboard' }, pathMatch: 'full', loadComponent: () => import('./features/auth/dashboard/content-area/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
          { path: 'blogs', data: { title: 'Page_Titles.Dash_Blogs' }, loadComponent: () => import('./features/auth/dashboard/content-area/admin/blogs/admin-blogs.component').then(m => m.AdminBlogsComponent) },
          { path: 'services', data: { title: 'Page_Titles.Dash_Services' }, loadComponent: () => import('./features/auth/dashboard/content-area/admin/services/admin-services.component').then(m => m.AdminServicesComponent) },
          { path: 'coupons', data: { title: 'Page_Titles.Dash_Coupons' }, loadComponent: () => import('./features/auth/dashboard/content-area/admin/coupons/admin-coupons.component').then(m => m.AdminCouponsComponent) },
          { path: 'products', data: { title: 'Page_Titles.Dash_Products' }, loadComponent: () => import('./features/auth/dashboard/content-area/admin/products/admin-products.component').then(m => m.AdminProductsComponent) },
          { path: 'doctors', data: { title: 'Page_Titles.Dash_Doctors' }, loadComponent: () => import('./features/auth/dashboard/content-area/admin/doctors/admin-doctors.component').then(m => m.AdminDoctorsComponent) },
          { path: 'clinics', data: { title: 'Page_Titles.Dash_Clinics' }, loadComponent: () => import('./features/auth/dashboard/content-area/admin/clinics/admin-clinics.component').then(m => m.AdminClinicsComponent) },
          { path: 'orders', data: { title: 'Page_Titles.Dash_Orders' }, loadComponent: () => import('./features/auth/dashboard/content-area/admin/orders/admin-orders.component').then(m => m.AdminOrdersComponent) },
          { path: 'users', data: { title: 'Page_Titles.Dash_Users' }, loadComponent: () => import('./features/auth/dashboard/content-area/admin/users/admin-users.component').then(m => m.AdminUsersComponent) },

      ]},
  ]},
  
  // Cart routes
  { path: 'cart', canActivate: [AuthRoleGuard], data: { expectedRole: 'user'},
    children: [
      { path: '', data: { title: 'Page_Titles.Cart' }, canActivate: [AuthRoleGuard], loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent) },
      { path: 'checkout/:cartId', data: { title: 'Page_Titles.Checkout' }, canActivate: [AuthRoleGuard], loadComponent: () => import('./features/cart/checkout/checkout.component').then(m => m.CheckoutComponent) },
  ]},
  
  // Favorites routes
  { path: 'favorates', canActivate: [AuthRoleGuard], data: { expectedRole: 'user', title: 'Page_Titles.Favorates'}, loadComponent: () => import('./features/favorates/favorates.component').then(m => m.FavoritesComponent)},

  // fallback route (wait to replace with custom 404)
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];