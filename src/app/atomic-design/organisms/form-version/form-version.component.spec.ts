import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormVersionComponent } from './form-version.component';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation/validation.service';

describe('FormVersionComponent', () => {
  let component: FormVersionComponent;
  let fixture: ComponentFixture<FormVersionComponent>;
  let validationService: ValidationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormVersionComponent],
      imports: [ReactiveFormsModule],
      providers: [ValidationService, FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(FormVersionComponent);
    component = fixture.componentInstance;
    validationService = TestBed.inject(ValidationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the function subscribeToValueChanges when a control value changes', () => {
    const releaseDateControl = new FormControl('');
    const finalDateControl = new FormControl('');
    const maximumQuotaControl = new FormControl('');

    component.form = new FormGroup({
      release_date: releaseDateControl,
      final_date: finalDateControl,
      maximum_quota: maximumQuotaControl
    });

    component.subscribeToValueChanges();

    const releaseDateSpy = spyOn(releaseDateControl, 'updateValueAndValidity').and.callThrough();
    const finalDateSpy = spyOn(finalDateControl, 'updateValueAndValidity').and.callThrough();
    const maximumQuotaSpy = spyOn(maximumQuotaControl, 'updateValueAndValidity').and.callThrough();

    releaseDateControl.setValue('2024-01-01');
    finalDateControl.setValue('2024-12-31');
    maximumQuotaControl.setValue('50');

    expect(releaseDateSpy).toHaveBeenCalledWith({ onlySelf: true, emitEvent: false });
    expect(finalDateSpy).toHaveBeenCalledWith({ onlySelf: true, emitEvent: false });
    expect(maximumQuotaSpy).toHaveBeenCalledWith({ onlySelf: true, emitEvent: false });
  });


  beforeEach(() => {
    component.form = new FormGroup({
      release_date: new FormControl('', validationService.getStandardValidators({ required: true })),
      final_date: new FormControl('', validationService.getStandardValidators({ required: true })),
      maximum_quota: new FormControl('', validationService.getStandardValidators({ required: true, pattern: '^[0-9]+$' }))
    });
  });

  it('should return error message for required validation', () => {
    const controlName = 'release_date';
    const control = component.form.get(controlName);
    control?.markAsTouched();
    control?.setErrors({ required: true });

    const errorMessage = component.getErrorMessage(controlName);
    expect(errorMessage).toBe('ⓘ El campo fecha de lanzamiento es obligatorio.');
  });

  it('should return empty string if control is pristine', () => {
    const controlName = 'maximum_quota';
    const errorMessage = component.getErrorMessage(controlName);
    expect(errorMessage).toBe('');
  });

  it('should return error message for pattern validation', () => {
    const controlName = 'maximum_quota';
    const control = component.form.get(controlName);
    control?.markAsTouched();
    control?.setErrors({ pattern: true });

    const errorMessage = component.getErrorMessage(controlName);
    expect(errorMessage).toBe('ⓘ El campo cupo máximo no es valido.');
  });

  it('should return empty string if control has no errors', () => {
    const controlName = 'final_date';
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

  beforeEach(() => {
    component.form = new FormGroup({
      release_date: new FormControl('', validationService.getStandardValidators({ required: true })),
      final_date: new FormControl('', validationService.getStandardValidators({ required: true })),
      maximum_quota: new FormControl('', validationService.getStandardValidators({ required: true, pattern: '^[0-9]+$' }))
    });
  });

  it('should call onFormSubmit with form data if form is valid', () => {
    component.formData = {
      onFormSubmit: jasmine.createSpy('onFormSubmit')
    };

    component.form.setValue({
      release_date: '2024-01-01',
      final_date: '2024-12-31',
      maximum_quota: '50'
    });

    component.submitForm();

    expect(component.formData.onFormSubmit).toHaveBeenCalledWith({
      maximumQuota: '50',
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    });
  });

  it('should not call onFormSubmit if form is invalid', () => {
    component.formData = {
      onFormSubmit: jasmine.createSpy('onFormSubmit')
    };

    component.form.setValue({
      release_date: '',
      final_date: '',
      maximum_quota: ''
    });

    component.submitForm();

    expect(component.formData.onFormSubmit).not.toHaveBeenCalled();
  });


  it('should emit closeModal event', () => {
    spyOn(component.closeModal, 'emit');
    component.close();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });
});
