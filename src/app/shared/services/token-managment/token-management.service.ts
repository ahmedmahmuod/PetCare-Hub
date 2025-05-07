import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../../../core/services/cart/cart.service';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly TOKEN_KEY = 'token';
  private cartService = inject(CartService);

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private roleSubject = new BehaviorSubject<string | null>(null);
  public role$ = this.roleSubject.asObservable();

  private roleLoadedSubject = new BehaviorSubject<boolean>(false);
  public roleLoaded$ = this.roleLoadedSubject.asObservable();

  setToken(token: string, role: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.isLoggedInSubject.next(true);
    this.roleSubject.next(role);
    this.roleLoadedSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
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
    localStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedInSubject.next(false);
    this.roleSubject.next(null);
    this.roleLoadedSubject.next(false);
    this.cartService.clearCoupon();
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  clearStorage(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.roleLoadedSubject.next(false);
  }

  logout(): void {
    this.clearStorage();
    this.isLoggedInSubject.next(false);
    this.roleSubject.next(null);
  }
}