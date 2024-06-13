import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const jwtDecodeMock = (token: string) => {
  return {
    role: 'ADMINISTRATOR',
    sub: 'admin@gmail.com',
    iat: 1717217758,
    exp: 1717219198
  };
};

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockToken = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU5JU1RSQVRPUiIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcxNzIxNzc1OCwiZXhwIjoxNzE3MjE5MTk4fQ.fwJOjK-F5YKV121Xowj0oYl4AU1mzaTVKbbBK7LgJOw';

  const setupLocalStorage = (token: string) => {
    localStorage.setItem('authToken', token);
  };

  beforeEach(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpyObj }
      ]
    });
    service = TestBed.inject(AuthService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false if roles array is empty', () => {
    const result = service.hasAnyRole([]);
    expect(result).toBeFalse();
  });

  it('should return false if roles array is not an array', () => {
    const result = service.hasAnyRole('invalid' as any);
    expect(result).toBeFalse();
  });

  it('should return false if user does not have any of the specified roles', () => {
    spyOn(service, 'getUserRole').and.returnValue('USER');
    const result = service.hasAnyRole(['ADMINISTRATOR', 'MANAGER']);
    expect(result).toBeFalse();
  });

  it('should return true if user has any of the specified roles', () => {
    spyOn(service, 'getUserRole').and.returnValue('ADMINISTRATOR');
    const result = service.hasAnyRole(['ADMINISTRATOR', 'MANAGER']);
    expect(result).toBeTrue();
  });

  it('should handle case where getUserRole returns null', () => {
    spyOn(service, 'getUserRole').and.returnValue(null);
    const result = service.hasAnyRole(['ADMINISTRATOR', 'MANAGER']);
    expect(result).toBeFalse();
  });

  it('should handle case where getUserRole returns undefined', () => {
    spyOn(service, 'getUserRole').and.returnValue(null);
    const result = service.hasAnyRole(['ADMINISTRATOR', 'MANAGER']);
    expect(result).toBeFalse();
  });

  it('should handle case where getUserRole returns unexpected role', () => {
    spyOn(service, 'getUserRole').and.returnValue('SOMETHING_ELSE');
    const result = service.hasAnyRole(['ADMINISTRATOR', 'MANAGER']);
    expect(result).toBeFalse();
  });

  it('should notify auth error', () => {
    const mockError = new HttpErrorResponse({
      error: new Error('Test Error'),
      status: 500,
      statusText: 'Internal Server Error'
    });

    service.notifyAuthError(mockError);

    service.authError$.subscribe(value => {
      expect(value).toBeTrue();
    });

    expect(service.getAuthError()).toEqual(mockError);
  });

  it('should clear auth error', () => {
    service.clearAuthError();

    service.authError$.subscribe(value => {
      expect(value).toBeFalse();
    });

    expect(service.getAuthError()).toBeNull();
  });

  it('should get auth error', () => {
    const mockError = new HttpErrorResponse({
      error: new Error('Test Error'),
      status: 500,
      statusText: 'Internal Server Error'
    });

    service.notifyAuthError(mockError);
    expect(service.getAuthError()).toEqual(mockError);
  });

  it('should redirect to login', () => {
    spyOn(service, 'clearAuthError').and.callThrough();
    localStorage.setItem('authToken', 'mockToken');

    service.redirectToLogin();

    expect(localStorage.getItem('authToken')).toBeNull();
    expect(service.clearAuthError).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});