import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    const expectedRoles = route.data['expectedRoles'];

    if (!Array.isArray(expectedRoles) || expectedRoles.length === 0) {
      return this.router.createUrlTree(['/login']);
    }

    if (this.authService.isLoggedIn() && this.authService.hasAnyRole(expectedRoles)) {
      return true;
    }

    return this.router.createUrlTree(['/login']);
  }
}