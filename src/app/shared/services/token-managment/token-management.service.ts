import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../../../core/services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly TOKEN_KEY = 'token';
  private cartService = inject(CartService);
  private platformId = inject(PLATFORM_ID);

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private roleSubject = new BehaviorSubject<string | null>(null);
  public role$ = this.roleSubject.asObservable();

  private roleLoadedSubject = new BehaviorSubject<boolean>(false);
  public roleLoaded$ = this.roleLoadedSubject.asObservable();

  setToken(token: string, role: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
    this.isLoggedInSubject.next(true);
    this.roleSubject.next(role);
    this.roleLoadedSubject.next(true);
  }

  getToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem(this.TOKEN_KEY) : null;
  }

  setRole(role: string | null): void {
    this.roleSubject.next(role);
    this.roleLoadedSubject.next(true);
  }

  getRole(): string | null {
    return this.roleSubject.value;
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isUser(): boolean {
    return this.getRole() === 'user';
  }

  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    this.isLoggedInSubject.next(false);
    this.roleSubject.next(null);
    this.roleLoadedSubject.next(false);
    this.cartService.clearCoupon();
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  clearStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    this.roleLoadedSubject.next(false);
  }

  logout(): void {
    this.clearStorage();
    this.isLoggedInSubject.next(false);
    this.roleSubject.next(null);
  }
}
