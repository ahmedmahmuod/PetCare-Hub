import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { AuthResponse, SignInModel, SignUpModel } from '../../../models/user/auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  // Sign up (Register) a new user
  signUp(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiUrl + 'users/signup', userData);
  }

  // Sign in (Login) a user
  signIn(userData: SignUpModel): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiUrl + 'users/login', userData);
  }

  // Sign out (Logout) a user
  signOut(): Observable<{status: string}> {
    return this.http.get<{status: string}>(environment.apiUrl + 'users/logout');
  }

  // Phase 1: enter email to receive a verification code
  requestForgetPassword(email: string): Observable<{message: string}> {
    return this.http.post<{message: string}>(environment.apiUrl + 'users/forgotPassword', {email});
  }

  // pahse 2: enter verification code and new password
  verifyCode(code: string): Observable<{status: string, message: string, userId: string}> {
    return this.http.post<{status: string, message: string, userId: string}>(environment.apiUrl + 'users/checkCode', {code});
  }

  // pahse 3: enter new password
  resetPassword(userId: string, newPasswords: {password: string, confirmPassword: string}): Observable<{message: string}> {
    return this.http.post<{message: string}>(environment.apiUrl + 'users/reset-password/' + userId, newPasswords);
  }
  


}
