import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  static getValidationMessages() {
    return {
      required: (fieldName: string) => `ⓘ El campo ${fieldName} es obligatorio.`,
      minlength: (fieldName: string, requiredLength: number) => `ⓘ El campo ${fieldName} debe tener al menos ${requiredLength} caracteres.`,
      maxlength: (fieldName: string, requiredLength: number) => `ⓘ El campo ${fieldName} no debe exceder los ${requiredLength} caracteres.`,
      email: (fieldName: string) =>  `ⓘ El campo ${fieldName} no es valido.`,
      pattern: (fieldName: string) => `ⓘ El campo ${fieldName} no es valido.`,
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
  
    if (list.length === 0) {
      message = `Seleccione las ${fieldName}.`;
    } else if (list.length < minSize) {
      message = `Debe seleccionar mínimo ${minSize} ${fieldName}.`;
    } else if (list.length > maxSize) {
      message = `Debe seleccionar máximo ${maxSize} ${fieldName}.`;
    }
  
    return { valid: !message, message };
  }

  getStandardValidators(config: { required?: boolean, min?: number, max?: number, pattern?: string, email?:boolean }): ValidatorFn[] {
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
    if (config.email){
      validators.push(ValidationService.email());
    }
    return validators;
  }
}