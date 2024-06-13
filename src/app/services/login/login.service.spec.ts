import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environmentAuth } from 'src/environments/environment';
import { LoginService } from './login.service';
import { AuthToken } from 'src/app/interfaces/auth-token.interface';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow login', () => {
    const dummyLogin = {email: 'saVbD@example.com', password: 'test'};
    const mockAuthToken: AuthToken = { token: 'mock-token' };

    service.login(dummyLogin).subscribe(login => {
      expect(login).toEqual(mockAuthToken);
    });

    const req = httpMock.expectOne(`${environmentAuth.apiBaseUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockAuthToken);
  });
});
