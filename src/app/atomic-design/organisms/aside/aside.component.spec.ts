import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsideComponent } from './aside.component';
import { OrganismsModule } from '../organisms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('AsideComponent', () => {
  let component: AsideComponent;
  let fixture: ComponentFixture<AsideComponent>;
  let authService: AuthService;

  // Función para simular un token válido en localStorage
  const setupLocalStorage = (token: string) => {
    localStorage.setItem('authToken', token);
  };

  beforeEach(async () => {
    setupLocalStorage('eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU5JU1RSQVRPUiIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcxNzIxNzc1OCwiZXhwIjoxNzE3MjE5MTk4fQ.fwJOjK-F5YKV121Xowj0oYl4AU1mzaTVKbbBK7LgJOw');

    await TestBed.configureTestingModule({
      declarations: [ AsideComponent ],
      imports: [OrganismsModule, MoleculesModule, RouterTestingModule],
      providers: [ AuthService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsideComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});