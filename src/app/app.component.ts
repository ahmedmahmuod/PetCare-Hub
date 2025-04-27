import { LanguageService } from './core/services/language/language.service';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageToggleComponent } from "./shared/components/buttons/langBtn.component";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from "./core/components/header/header.component";
import { FooterComponent } from "./core/components/footer/footer.component";
import { ToastModule } from 'primeng/toast';
import { TokenService } from './shared/services/token-managment/token-management.service';
import { UsersService } from './core/services/user/users.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [LanguageToggleComponent, HeaderComponent, FooterComponent, RouterOutlet, CommonModule, ToastModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private languageService = inject(LanguageService);
  private tokenService = inject(TokenService);
  private usersService = inject(UsersService);
  
  currentLang: string = 'en';
  dir: 'ltr' | 'rtl' = 'ltr';
  currentRoute = '';

  // Inject the TranslateService and Router
  constructor(private translate: TranslateService, private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  shouldShowLayout(): boolean {
    return !['/auth/login', '/auth/register','/auth/forget-password'].includes(this.currentRoute);
  }

  ngOnInit() {
    // Set the default language
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLang = lang;
      this.translate.use(lang);
      this.dir = lang === 'ar' ? 'rtl' : 'ltr';
    });

    // Scroll to top on route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && isPlatformBrowser(this.platformId)) {
        const currentRoute = this.router.routerState.snapshot.root.firstChild;
        const disableScroll = currentRoute?.data['disableScroll'];
    
        if (!disableScroll) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });

    if (this.tokenService.getToken()) {
      this.usersService.getMeUserData().pipe(
        catchError(() => {
          this.tokenService.logout();
          return of(null);
        })
      ).subscribe();
    }
  }

}
