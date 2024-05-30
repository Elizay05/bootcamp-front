import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalFormComponent } from './modal-form.component';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Option } from 'src/app/interfaces/option.interface';
import { OrganismsModule } from '../organisms.module';
import { MoleculesModule } from '../../molecules/molecules.module';

describe('ModalFormComponent', () => {
  let component: ModalFormComponent;
  let fixture: ComponentFixture<ModalFormComponent>;
  let validationService: ValidationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormComponent],
      imports: [ReactiveFormsModule, OrganismsModule, MoleculesModule],
      providers: [ValidationService]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalFormComponent);
    component = fixture.componentInstance;
    validationService = TestBed.inject(ValidationService);

    component.formData = {
      onFormSubmit: () => {},
      isSelectCapacity: false,
      isSelectBootcamp: false,
      options: [] as Option[],
      minOptionsSize: 1,
      maxOptionsSize: 5,
      selectName: 'Test Select'
    };

    component.form = new FormGroup({
      nombre: new FormControl('', validationService.getStandardValidators({ required: true, min: 3, max: 50 })),
      descripcion: new FormControl('', validationService.getStandardValidators({ required: true, min: 5, max: 200 }))
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call updateValueAndValidity when nombre value changes', () => {
    const nombreControl = component.form.get('nombre');
    const spy = spyOn(nombreControl!, 'updateValueAndValidity').and.callThrough();

    nombreControl!.setValue('Nuevo nombre');

    expect(spy).toHaveBeenCalledWith({ onlySelf: true, emitEvent: false });
  });

  it('should call updateValueAndValidity when descripcion value changes', () => {
    const descripcionControl = component.form.get('descripcion');
    const spy = spyOn(descripcionControl!, 'updateValueAndValidity').and.callThrough();

    descripcionControl!.setValue('Nueva descripción');

    expect(spy).toHaveBeenCalledWith({ onlySelf: true, emitEvent: false });
  });


  it('should return error message for required validation', () => {
    const controlName = 'nombre';
    const control = component.form.get(controlName);
    control?.markAsTouched();
    control?.setErrors({ required: true });

    const errorMessage = component.getErrorMessage(controlName);
    expect(errorMessage).toBe('ⓘ El campo nombre es obligatorio.');
  });

  it('should return error message for minlength validation', () => {
    const controlName = 'nombre';
    const control = component.form.get(controlName);
    control?.markAsTouched();
    control?.setErrors({ minlength: { requiredLength: 3, actualLength: 1 } });

    const errorMessage = component.getErrorMessage(controlName);
    expect(errorMessage).toBe('ⓘ El campo nombre debe tener al menos 3 caracteres.');
  });

  it('should return error message for maxlength validation', () => {
    const controlName = 'nombre';
    const control = component.form.get(controlName);
    control?.markAsTouched();
    control?.setErrors({ maxlength: { requiredLength: 50, actualLength: 51 } });

    const errorMessage = component.getErrorMessage(controlName);
    expect(errorMessage).toBe('ⓘ El campo nombre no debe exceder los 50 caracteres.');
  });

  it('should return empty string if control is pristine', () => {
    const controlName = 'nombre';
    const errorMessage = component.getErrorMessage(controlName);
    expect(errorMessage).toBe('');
  });

  it('should return empty string if control has no errors', () => {
    const controlName = 'descripcion';
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
    component.formData = {
      onFormSubmit: jasmine.createSpy('onFormSubmit')
    }
  
    component.form.setValue({
      nombre: 'Test Name',
      descripcion: 'Test Description'
    });
  
    component.submitForm();
  
    expect(component.formData.onFormSubmit).toHaveBeenCalledWith({
      name: 'Test Name',
      description: 'Test Description'
    });
  });


    /*
    it('should submit form with technologies data if isSelectCapacity is true', () => {
      component.formData.isSelectCapacity = true;
      spyOn(component.formData, 'onFormSubmit');
      component.selectedOptions = [
        { id: 1, name: 'Technology 1' },
        { id: 2, name: 'Technology 2' },
        { id: 3, name: 'Technology 3' }
      ];
    
      component.form.setValue({
        nombre: 'Test Name',
        descripcion: 'Test Description'
      });
    
      component.submitForm();
    
      expect(component.formData.onFormSubmit).toHaveBeenCalledWith({
        name: 'Test Name',
        description: 'Test Description',
        technologies: [1, 2, 3]
      });
    });
    */

  it('should not submit form with incorrect data', () => {
    component.formData.onFormSubmit = jasmine.createSpy('onFormSubmit');
  
    component.form.setValue({
      nombre: '',
      descripcion: ''
    });
  
    component.submitForm();
  
    expect(component.formData.onFormSubmit).not.toHaveBeenCalled();
  });

  it('should toggle showSelect and hasToggledInputSelect properties', () => {
    expect(component.showSelect).toBe(false);
    expect(component.hasToggledInputSelect).toBe(false);
  
    component.toggleInputSelect();
  
    expect(component.showSelect).toBe(true);
    expect(component.hasToggledInputSelect).toBe(true);
  });

  it('should set showSelect to false if hasToggledInputSelect is true', () => {
    component.hasToggledInputSelect = true;
    component.toggleInputSelect();
    expect(component.showSelect).toBe(false);
  });

  it('should add selected option to selectedOptions if not already selected', () => {
    const mockOption: Option = { id: 1, name: 'Option 1' };
    component.selectedOptions = [];
    
    const mockEvent = new Event('change');
    Object.defineProperty(mockEvent, 'target', {
      value: { value: '1' },
      writable: true
    });
  
    component.formData = {
      options: [mockOption],
      minOptionsSize: 1,
      maxOptionsSize: 5,
      selectName: 'selectedOptions'
    };
  
    component.onSelectionChange(mockEvent);
  
    expect(component.selectedOptions.length).toBe(1);
    expect(component.selectedOptions).toContain(mockOption);
    expect(component.isIncorrectSize).toBe('valid');
  });

  it('should not add selected option if already in selectedOptions', () => {
    const mockOption: Option = { id: 1, name: 'Option 1' };
    component.selectedOptions = [mockOption];
    
    const mockEvent = new Event('change');
    Object.defineProperty(mockEvent, 'target', {
      value: { value: '1' },
      writable: true
    });
  
    component.formData = {
      options: [mockOption],
      minOptionsSize: 1,
      maxOptionsSize: 5,
      selectName: 'selectedOptions'
    };
  
    component.onSelectionChange(mockEvent);
  
    expect(component.selectedOptions.length).toBe(1);
    expect(component.isIncorrectSize).toBe('valid');
  });

  it('should not add selected option if not found in formData.options', () => {
    const mockOption: Option = { id: 1, name: 'Option 1' };
    component.selectedOptions = [];
    
    const mockEvent = new Event('change');
    Object.defineProperty(mockEvent, 'target', {
      value: { value: '0' },
      writable: true
    });
  
    component.formData = {
      options: [mockOption],
      minOptionsSize: 1,
      maxOptionsSize: 5,
      selectName: 'selectedOptions'
    };
  
    component.onSelectionChange(mockEvent);
  
    expect(component.selectedOptions.length).toBe(0);
    expect(component.isIncorrectSize).toBe('Seleccione las selectedOptions.');
  });

  it('should remove selected option from selectedOptions and update validation state', () => {
    const mockOptionToRemove: Option = { id: 1, name: 'Option 1' };
    component.selectedOptions = [mockOptionToRemove, { id: 2, name: 'Option 2' }];
    
    component.formData = {
      minOptionsSize: 1,
      maxOptionsSize: 5,
      selectName: 'selectedOptions'
    };
    
    component.removeItem(mockOptionToRemove);
    
    expect(component.selectedOptions).not.toContain(mockOptionToRemove);
    expect(component.isIncorrectSize).toBe('valid');
  });


  it('should emit closeModal event', () => {
    spyOn(component.closeModal, 'emit');
    component.close();
    expect(component.closeModal.emit).toHaveBeenCalled();
  })
});
