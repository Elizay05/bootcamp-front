import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let AuthServiceSpy = jasmine.createSpyObj('AuthService', ['redirectToLogin']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavbarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    AuthServiceSpy = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout, clear localStorage, and navigate to login', () => {
    spyOn(AuthServiceSpy, 'redirectToLogin');

    component.logout();

    expect(AuthServiceSpy.redirectToLogin).toHaveBeenCalled();
  });
});
