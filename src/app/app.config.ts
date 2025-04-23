// Cores
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

// Routes
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

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
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),

    provideTranslateService(), 
    TranslateStore,
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  ],
};
