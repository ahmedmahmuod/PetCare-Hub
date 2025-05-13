import { Routes } from '@angular/router';
import { AuthRoleGuard } from './core/guards/auth-guards/auth-role-guard.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },

  { path: 'services', 
    children: [
      { path: '', loadComponent: () => import('./features/ServicesProfile/all-services/all-services.component').then(m => m.AllServicesComponent) },
      { path: ':serviceId', loadComponent: () => import('./features/ServicesProfile/single-service/single-service.component').then(m => m.SingleServiceComponent) }
  ]},

  { path: 'adoption', data: { disableScroll: true }, loadComponent: () => import('./features/adoption/adoption.component').then(m => m.AdoptionComponent), children: [
      { path: 'dogs', loadComponent: () => import('./features/adoption/dogs/dogs.component').then(m => m.DogsComponent) },
      { path: 'cats', loadComponent: () => import('./features/adoption/cats/cats.component').then(m => m.CatsComponent) },
      { path: 'shelters', loadComponent: () => import('./features/adoption/shelters/sehalters.component').then(m => m.SheltersListComponent) }
  ]},
  { path: 'adoption/shelters/:shelterId', loadComponent: () => import('./features/adoption/shelters/shelter-details/shelter-details.component').then(m => m.ShelterDetailsComponent) },
  { path: 'adoption/:pets', loadComponent: () => import('./features/adoption/pets/pets.component').then(m => m.PetsComponent) },

  { path: 'veterinary', loadComponent: () => import('./features/vets/vets.component').then(m => m.VetsComponent),
    children: [
      { path: '', loadComponent: () => import('./features/vets/vets-home/vets-home.component').then(m => m.VetsHomeComponent) },
      { path: 'doctors', loadComponent: () => import('./features/vets/doctors/doctors.component').then(m => m.DoctorsComponent) },
      { path: 'clinics', loadComponent: () => import('./features/vets/clinics/clinics.component').then(m => m.ClinicsComponent) },
    ]},
  { path: 'veterinary/doctors/:doctorId', loadComponent: () => import('./features/vets/doctors/doctor-profile/doctor-profile.component').then(m => m.DoctorProfileComponent) },
  { path: 'veterinary/clinics/:clinicsId', loadComponent: () => import('./features/vets/clinics/clinics-profile/clinics-profile.component').then(m => m.ClinicDetailComponent) },
    
  { path: 'blogs', loadComponent: () => import('./features/blogs/blogs.component').then(m => m.BlogsComponent) },
  { path: 'shop', loadComponent: () => import('./features/shop/shop.component').then(m => m.ProductListComponent) },
  
  { path: 'community', loadComponent: () => import('./features/community/community.component').then(m => m.CommunityComponent) },
  { path: 'community/profile/:profileId', loadComponent: () => import('./features/user/profile/user-profile.component').then(m => m.UserProfileComponent) },

  { 
    path: 'auth', canActivate: [AuthRoleGuard], data: { expectedRole: null },
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
      { path: 'forget-password', loadComponent: () => import('./features/auth/forget-password/forget-password.component').then(m => m.PasswordResetComponent) }
    ]
  },
  
  // user profile routes
  { path: 'user',  canActivate: [AuthRoleGuard], data: { expectedRole: 'user' },
    children: [
      { path: 'account-details', canActivate: [AuthRoleGuard], loadComponent: () => import('./features/auth/my-account/my-account.component').then(m => m.MyAccountComponent) },
      { path: 'dashboard', canActivate: [AuthRoleGuard], loadComponent: () => import('./features/auth/dashboard/dashboard.component').then(m => m.DashboardComponent), 
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'pets' },
          { path: 'pets', loadComponent: () => import('./features/auth/dashboard/content-area/user/my-pets/user-pets.component').then(m => m.UserPetsComponent )},
          { path: 'orders', loadComponent: () => import('./features/auth/dashboard/content-area/user/my-orders/user-orders.component').then(m => m.UserOrdersComponent )},
        ]
       },
  ]},
    
    // admin profile routes
  { path: 'admin', canActivate: [AuthRoleGuard], data: { expectedRole: 'admin' },
    children: [
      { path: 'account-details', canActivate: [AuthRoleGuard], loadComponent: () => import('./features/auth/my-account/my-account.component').then(m => m.MyAccountComponent) },
      { path: 'dashboard', canActivate: [AuthRoleGuard],  loadComponent: () => import('./features/auth/dashboard/dashboard.component').then(m => m.DashboardComponent), 
        children: [
          { path: '', pathMatch: 'full', loadComponent: () => import('./features/auth/dashboard/content-area/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
          { path: 'blogs', loadComponent: () => import('./features/auth/dashboard/content-area/admin/blogs/admin-blogs.component').then(m => m.AdminBlogsComponent) },
          { path: 'services', loadComponent: () => import('./features/auth/dashboard/content-area/admin/services/admin-services.component').then(m => m.AdminServicesComponent) },
          { path: 'coupons', loadComponent: () => import('./features/auth/dashboard/content-area/admin/coupons/admin-coupons.component').then(m => m.AdminCouponsComponent) },
          { path: 'products', loadComponent: () => import('./features/auth/dashboard/content-area/admin/products/admin-products.component').then(m => m.AdminProductsComponent) },
          { path: 'doctors', loadComponent: () => import('./features/auth/dashboard/content-area/admin/doctors/admin-doctors.component').then(m => m.AdminDoctorsComponent) },
          { path: 'clinics', loadComponent: () => import('./features/auth/dashboard/content-area/admin/clinics/admin-clinics.component').then(m => m.AdminClinicsComponent) },
          { path: 'orders', loadComponent: () => import('./features/auth/dashboard/content-area/admin/orders/admin-orders.component').then(m => m.AdminOrdersComponent) },
          { path: 'users', loadComponent: () => import('./features/auth/dashboard/content-area/admin/users/admin-users.component').then(m => m.AdminUsersComponent) },

      ]},
  ]},
  
  // Cart routes
  { path: 'cart', canActivate: [AuthRoleGuard], data: { expectedRole: 'user'},
    children: [
      { path: '', canActivate: [AuthRoleGuard], loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent) },
      { path: 'checkout/:cartId', canActivate: [AuthRoleGuard], loadComponent: () => import('./features/cart/checkout/checkout.component').then(m => m.CheckoutComponent) },
  ]},
  
  // Favorites routes
  { path: 'favorates', canActivate: [AuthRoleGuard], data: { expectedRole: 'user'}, loadComponent: () => import('./features/favorates/favorates.component').then(m => m.FavoritesComponent)},

  // fallback route (wait to replace with custom 404)
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];