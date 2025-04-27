import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../../services/language/language.service';
import { TokenService } from '../../../shared/services/token-managment/token-management.service';
import { AuthService } from '../../services/auth/logs/user-loging.service';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { UsersService } from '../../services/user/users.service';
import { UserData } from '../../models/user/details/user-details.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, RouterLinkActive, OverlayPanelModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('slideAnimation', [
      state('void', style({
          transform: 'translateX(100%)',
          opacity: 0,
      })),
      state('*', style({
          transform: 'translateX(0)',
          opacity: 1,
      })),
      transition('void => *', [animate('400ms ease-out')]),
      transition('* => void', [animate('200ms ease-in')]),
  ]),

  trigger('dropdownAnimation', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-8px)' }),
      animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ]),
    transition(':leave', [
      animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-8px)' }))
    ])
  ])
]
})
export class HeaderComponent implements OnInit{
  @ViewChild('userMenu') userMenu!: OverlayPanel;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  private tokenService = inject(TokenService);
  private languageService = inject(LanguageService);
  private authService = inject(AuthService);
  private usersService = inject(UsersService);

  currentLang: string = 'en';
  isMenuOpen = false;
  isLoggedIn = this.tokenService.isLoggedIn$;
  isRole$ = this.tokenService.role$;
  userData$ = this.usersService.user$;
  isOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLang = lang;
    });

    if (this.tokenService.hasToken()) {
      this.usersService.getMeUserData().subscribe({
        next: () => {
          this.usersService.user$.subscribe((user) => {
            if (user) {
              this.userData$ = of(user);
            }
          });
        },
        error: () => {
          this.tokenService.logout();
        }
      });
    }
    
  }

  isHeaderVisible = true;
  lastScrollTop = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > this.lastScrollTop && currentScroll > 100) {
      // Scrolling down
      this.isHeaderVisible = false;
    } else {
      // Scrolling up
      this.isHeaderVisible = true;
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }  


  // Dropdown Menu
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const dropdownElement = this.dropdownMenu?.nativeElement;
    const clickedInside = dropdownElement?.contains(targetElement);
    
    if (!clickedInside && this.isOpen) {
      this.isOpen = false;
    }
  }
  
  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }
  
  logout() {
    this.authService.signOut().subscribe((res) => {
      this.tokenService.removeToken()
      location.reload();
      
    })
    this.isOpen = false;
  }
  


}
