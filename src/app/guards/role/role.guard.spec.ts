import { TestBed } from '@angular/core/testing';
import { RoleGuard } from './role.guard';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'hasAnyRole']);
    const routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(RoleGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is logged in and has any of the expected roles', () => {
    const route = new ActivatedRouteSnapshot();
    route.data = { expectedRoles: ['admin', 'user'] };
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    authService.isLoggedIn.and.returnValue(true);
    authService.hasAnyRole.and.returnValue(true);

    const result = guard.canActivate(route, state);

    expect(result).toBe(true);
  });

  it('should return UrlTree if expectedRoles is not an array or is empty', () => {
    const route = new ActivatedRouteSnapshot();
    route.data = { expectedRoles: [] };
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    const urlTree = new UrlTree();
    router.createUrlTree.and.returnValue(urlTree);

    const result = guard.canActivate(route, state);

    expect(result).toBe(urlTree);
  });

  it('should return UrlTree if user is not logged in', () => {
    const route = new ActivatedRouteSnapshot();
    route.data = { expectedRoles: ['admin', 'user'] };
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    authService.isLoggedIn.and.returnValue(false);
    const urlTree = new UrlTree();
    router.createUrlTree.and.returnValue(urlTree);

    const result = guard.canActivate(route, state);

    expect(result).toBe(urlTree);
  });

  it('should return UrlTree if user does not have any of the expected roles', () => {
    const route = new ActivatedRouteSnapshot();
    route.data = { expectedRoles: ['admin', 'user'] };
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    authService.isLoggedIn.and.returnValue(true);
    authService.hasAnyRole.and.returnValue(false);
    const urlTree = new UrlTree();
    router.createUrlTree.and.returnValue(urlTree);

    const result = guard.canActivate(route, state);

    expect(result).toBe(urlTree);
  });
});