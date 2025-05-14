// Cores
import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

// Routes
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// Translate
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideTranslateService, TranslateLoader, TranslateStore } from '@ngx-translate/core';

// Store Ngrx
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { blogsReducer } from './stores/blogs-store/blogs.reducer';
import { BlogsEffects } from './stores/blogs-store/blogs.effects';
import { petsReducer } from './stores/pets-store/pets.reducer';
import { PetsEffects } from './stores/pets-store/pets.effects';
import { MessageService } from 'primeng/api';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { provideClientHydration } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ 
      blogs: blogsReducer,
      pets: petsReducer
    }),
    provideEffects([
      BlogsEffects,
      PetsEffects
    ]),
    
    MessageService,
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

    provideTranslateService(), 
    TranslateStore,
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }, provideClientHydration(), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ],
};
