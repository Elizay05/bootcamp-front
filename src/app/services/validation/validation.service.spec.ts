import { TestBed } from '@angular/core/testing';
import { ValidationService } from './validation.service';
import { FormControl } from '@angular/forms';
import { VALIDATION_MESSAGES, formatValidationMessage } from 'src/app/util/validation-messages.constants';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ValidationService]
    }).compileComponents();
    service = TestBed.inject(ValidationService);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get validation messages', () => {
    const controlName = 'nombre';
    const messages = ValidationService.getValidationMessages();

    const expectedMessageRequired = formatValidationMessage(VALIDATION_MESSAGES.REQUIRED, { fieldName: controlName });
    const expectedMessageMinLength = formatValidationMessage(VALIDATION_MESSAGES.MINLENGTH, { requiredLength: 3, fieldName: controlName });
    const expectedMessageMaxLength = formatValidationMessage(VALIDATION_MESSAGES.MAXLENGTH, { requiredLength: 50, fieldName: controlName });
    const expectedMessagePattern = formatValidationMessage(VALIDATION_MESSAGES.PATTERN, { fieldName: controlName });


    expect(messages.required(controlName)).toBe(expectedMessageRequired);
    expect(messages.minlength(controlName, 3)).toBe(expectedMessageMinLength);
    expect(messages.maxlength(controlName, 50)).toBe(expectedMessageMaxLength);
    expect(messages.pattern(controlName)).toBe(expectedMessagePattern);
  });

  it('should validate required field', () => {
    const validator = ValidationService.required();
    const control = new FormControl('');
    expect(validator(control)).toEqual({ required: true });
    control.setValue('test');
    expect(validator(control)).toBeNull();
  });

  it('should validate min length', () => {
    const validator = ValidationService.minLength(3);
    const control = new FormControl('te');
    expect(validator(control)).toEqual({ minlength: { requiredLength: 3, actualLength: 2 } });
    control.setValue('test');
    expect(validator(control)).toBeNull();
  });

  it('should validate max length', () => {
    const validator = ValidationService.maxLength(5);
    const control = new FormControl('testing');
    expect(validator(control)).toEqual({ maxlength: { requiredLength: 5, actualLength: 7 } });
    control.setValue('test');
    expect(validator(control)).toBeNull();
  });

  it('should validate list size', () => {
    const minSize = 2;
    const maxSize = 4;
    const fieldName = 'elementos';
    let list = [1];
    let result = service.validateListSize(minSize, maxSize, list, fieldName);
    expect(result).toEqual({ valid: false, message: 'Debe seleccionar mínimo 2 elementos.' });

    list = [1, 2, 3, 4, 5];
    result = service.validateListSize(minSize, maxSize, list, fieldName);
    expect(result).toEqual({ valid: false, message: 'Debe seleccionar máximo 4 elementos.' });

    list = [1, 2, 3];
    result = service.validateListSize(minSize, maxSize, list, fieldName);
    expect(result).toEqual({ valid: true, message: undefined });
  });

  it('should get standard validators', () => {
    const config = { required: true, min: 3, max: 5, pattern: '^[a-zA-Z]+$' };
    const validators = service.getStandardValidators(config);

    expect(validators.length).toBe(4);

    const control = new FormControl('');
    let result = validators[0](control);
    expect(result).toEqual({ required: true });

    control.setValue('te');
    result = validators[1](control);
    expect(result).toEqual({ minlength: { requiredLength: 3, actualLength: 2 } });

    control.setValue('testing');
    result = validators[2](control);
    expect(result).toEqual({ maxlength: { requiredLength: 5, actualLength: 7 } });

    control.setValue('test123');
    result = validators[3](control);
    expect(result).toEqual({ pattern: { requiredPattern: '^[a-zA-Z]+$', actualValue: 'test123' } });
  });
});