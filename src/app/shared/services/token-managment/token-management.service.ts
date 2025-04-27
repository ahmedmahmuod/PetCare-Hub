import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly TOKEN_KEY = 'token';
  private readonly ROLE_KEY = 'role';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private roleSubject = new BehaviorSubject<string | null>(this.getRole());
  public role$ = this.roleSubject.asObservable();

  setToken(token: string, role: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.ROLE_KEY, role);
    this.isLoggedInSubject.next(true);
    this.roleSubject.next(role);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
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
    localStorage.removeItem(this.ROLE_KEY);
    this.roleSubject.next(null);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  clearStorage(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
  }

  logout(): void {
    this.clearStorage();
    this.isLoggedInSubject.next(false);
    this.roleSubject.next(null);
  }
}
