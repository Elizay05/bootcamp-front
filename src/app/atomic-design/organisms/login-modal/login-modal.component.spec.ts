import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { LoginModalComponent } from './login-modal.component';
import { ValidationService } from 'src/app/services/validation/validation.service';

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;
  let validationService: ValidationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginModalComponent],
      imports: [ReactiveFormsModule],
      providers: [ValidationService, FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    validationService = TestBed.inject(ValidationService);

    component.formData = {
      onFormSubmit: jasmine.createSpy('onFormSubmit')
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.form.contains('email')).toBe(true);
    expect(component.form.contains('password')).toBe(true);
  });

  it('should call updateValueAndValidity when email value changes', () => {
    const emailControl = component.form.get('email');
    const spy = spyOn(emailControl!, 'updateValueAndValidity').and.callThrough();

    emailControl!.setValue('test@example.com');

    expect(spy).toHaveBeenCalledWith({ onlySelf: true, emitEvent: false });
  });

  it('should call updateValueAndValidity when password value changes', () => {
    const passwordControl = component.form.get('password');
    const spy = spyOn(passwordControl!, 'updateValueAndValidity').and.callThrough();

    passwordControl!.setValue('password123');

    expect(spy).toHaveBeenCalledWith({ onlySelf: true, emitEvent: false });
  });

  it('should return error message for required validation', () => {
    const controlName = 'email';
    const control = component.form.get(controlName);
    control?.markAsTouched();
    control?.setErrors({ required: true });

    const errorMessage = component.getErrorMessage(controlName);
    expect(errorMessage).toBe('ⓘ El campo correo es obligatorio.');
  });

  it('should return error message for minlength validation', () => {
    const controlName = 'password';
    const control = component.form.get(controlName);
    control?.markAsTouched();
    control?.setErrors({ minlength: { requiredLength: 3, actualLength: 1 } });

    const errorMessage = component.getErrorMessage(controlName);
    expect(errorMessage).toBe('ⓘ El campo contraseña debe tener al menos 3 caracteres.');
  });

  it('should return error message for maxlength validation', () => {
    const controlName = 'email';
    const control = component.form.get(controlName);
    control?.markAsTouched();
    control?.setErrors({ maxlength: { requiredLength: 50, actualLength: 51 } });

    const errorMessage = component.getErrorMessage(controlName);
    expect(errorMessage).toBe('ⓘ El campo correo no debe exceder los 50 caracteres.');
  });

  it('should return error message for email validation', () => {
    const controlName = 'email';
    const control = component.form.get(controlName);
    control?.markAsTouched();
    control?.setErrors({ email: true });

    const errorMessage = component.getErrorMessage(controlName);
    expect(errorMessage).toBe('ⓘ El campo correo no es valido.');
  });

  it('should return empty string if control is pristine', () => {
    const controlName = 'email';
    const errorMessage = component.getErrorMessage(controlName);
    expect(errorMessage).toBe('');
  });

  it('should return empty string if control has no errors', () => {
    const controlName = 'password';
    const control = component.form.get(controlName);
    control?.markAsTouched();
    control?.setErrors(null);

    const errorMessage = component.getErrorMessage(controlName);
    expect(errorMessage).toBe('');
  });

  it('should return empty string if control does not exist', () => {
    const controlName = 'non_existing_control';
    const errorMessage = component.getErrorMessage(controlName);
    expect(errorMessage).toBe('');
  });

  it('should submit form with correct data', () => {
    component.form.setValue({
      email: 'test@example.com',
      password: 'password123'
    });

    component.submitForm();

    expect(component.formData.onFormSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });

  it('should not submit form with invalid data', () => {
    component.form.setValue({
      email: '',
      password: ''
    });

    component.submitForm();

    expect(component.formData.onFormSubmit).not.toHaveBeenCalled();
  });

  it('should emit closeModal event when close is called', () => {
    spyOn(component.closeModal, 'emit');

    component.close();

    expect(component.closeModal.emit).toHaveBeenCalled();
  });
});