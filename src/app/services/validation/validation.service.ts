import { Injectable } from '@angular/core';
import { Validators, ValidatorFn } from '@angular/forms';
import { VALIDATION_MESSAGES, formatValidationMessage } from 'src/app/util/validation-messages.constants';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  static getValidationMessages() {
    return {
      required: (fieldName: string) => formatValidationMessage(VALIDATION_MESSAGES.REQUIRED, { fieldName }),
      minlength: (fieldName: string, requiredLength: number) => formatValidationMessage(VALIDATION_MESSAGES.MINLENGTH, { fieldName, requiredLength }),
      maxlength: (fieldName: string, requiredLength: number) => formatValidationMessage(VALIDATION_MESSAGES.MAXLENGTH, { fieldName, requiredLength }),
      email: (fieldName: string) => formatValidationMessage(VALIDATION_MESSAGES.EMAIL, { fieldName }),
      pattern: (fieldName: string) => formatValidationMessage(VALIDATION_MESSAGES.PATTERN, { fieldName }),
    };
  }

  static required(): ValidatorFn {
    return Validators.required;
  }

  static minLength(min: number): ValidatorFn {
    return Validators.minLength(min);
  }

  static maxLength(max: number): ValidatorFn {
    return Validators.maxLength(max);
  }

  static email(): ValidatorFn {
    return Validators.email;
  }

  validateListSize(minSize: number, maxSize: number, list: any[], fieldName: string): { valid: boolean, message?: string } {
    let message;
    let fieldNameMinus = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);

    if (list.length === 0) {
      message = formatValidationMessage(VALIDATION_MESSAGES.SELECT_ITEMS, { fieldName: fieldNameMinus });
    } else if (list.length < minSize) {
      message = formatValidationMessage(VALIDATION_MESSAGES.MIN_ITEMS, { minSize, fieldName: fieldNameMinus });
    } else if (list.length > maxSize) {
      message = formatValidationMessage(VALIDATION_MESSAGES.MAX_ITEMS, { maxSize, fieldName: fieldNameMinus });
    }

    return { valid: !message, message };
  }

  getStandardValidators(config: { required?: boolean, min?: number, max?: number, pattern?: string, email?: boolean }): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (config.required) {
      validators.push(ValidationService.required());
    }
    if (config.min !== undefined) {
      validators.push(ValidationService.minLength(config.min));
    }
    if (config.max !== undefined) {
      validators.push(ValidationService.maxLength(config.max));
    }
    if (config.pattern) {
      validators.push(Validators.pattern(config.pattern));
    }
    if (config.email) {
      validators.push(ValidationService.email());
    }
    return validators;
  }
}