import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  static getValidationMessages() {
    return {
      required: (fieldName: string) => `ⓘ El campo ${fieldName} es obligatorio.`,
      minlength: (fieldName: string, requiredLength: number) => `ⓘ El campo ${fieldName} debe tener al menos ${requiredLength} caracteres.`,
      maxlength: (fieldName: string, requiredLength: number) => `ⓘ El campo ${fieldName} no debe exceder los ${requiredLength} caracteres.`
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

  validateListSize(minSize: number, maxSize: number, list: any[], fieldName: string): { valid: boolean, message?: string } {
    const message = list.length < minSize ? `Debe seleccionar mínimo ${minSize} ${fieldName}.` :
      list.length > maxSize ? `Debe seleccionar máximo ${maxSize} ${fieldName}.` : undefined;
    return { valid: !message, message };
  }

  getStandardValidators(config: { required?: boolean, min?: number, max?: number }): ValidatorFn[] {
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
    return validators;
  }
}