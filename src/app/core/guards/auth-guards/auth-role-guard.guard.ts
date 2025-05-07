import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { TokenService } from '../../../shared/services/token-managment/token-management.service';
import { combineLatest, filter, map, Observable, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthRoleGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const expectedRole = route.data['expectedRole'] as 'user' | 'admin' | null;

    return combineLatest([
      this.tokenService.isLoggedIn$,
      this.tokenService.role$,
      this.tokenService.roleLoaded$
    ]).pipe(
      filter(([_, __, roleLoaded]) => roleLoaded),
      take(1),
      map(([isLoggedIn, currentRole]) => {
        if (expectedRole === null && isLoggedIn) {
          this.router.navigate(['/']);
          return false;
        }

        if (!isLoggedIn && expectedRole !== null) {
          this.router.navigate(['/auth/login']);
          return false;
        }

        if (expectedRole && currentRole !== expectedRole) {
          this.router.navigate(['/']);
          return false;
        }

        return true;
      })
    );
  }
}