import { VALIDATION_MESSAGES, formatValidationMessage } from "./validation-messages.constants";

describe('formatValidationMessage', () => {
  it('should return the template when no params are provided', () => {
    const template = VALIDATION_MESSAGES.REQUIRED;
    const result = formatValidationMessage(template);
    expect(result).toBe(template);
  });

  it('should replace the placeholders with provided params', () => {
    const template = VALIDATION_MESSAGES.MINLENGTH;
    const params = { fieldName: 'nombre', requiredLength: 3 };
    const expectedMessage = "ⓘ El campo nombre debe tener al menos 3 caracteres.";
    const result = formatValidationMessage(template, params);
    expect(result).toBe(expectedMessage);
  });

  it('should replace multiple placeholders with provided params', () => {
    const template = "El {fieldName} debe tener entre {min} y {max} caracteres.";
    const params = { fieldName: 'nombre', min: 3, max: 10 };
    const expectedMessage = "El nombre debe tener entre 3 y 10 caracteres.";
    const result = formatValidationMessage(template, params);
    expect(result).toBe(expectedMessage);
  });

  it('should return the template if no matching placeholders are found', () => {
    const template = VALIDATION_MESSAGES.EMAIL;
    const params = { nonexistent: 'value' };
    const result = formatValidationMessage(template, params);
    expect(result).toBe(template);
  });

  it('should handle multiple occurrences of the same placeholder', () => {
    const template = "El {fieldName} y el {fieldName} deben coincidir.";
    const params = { fieldName: 'correo electrónico' };
    const expectedMessage = "El correo electrónico y el correo electrónico deben coincidir.";
    const result = formatValidationMessage(template, params);
    expect(result).toBe(expectedMessage);
  });

  it('should replace placeholders with numerical values', () => {
    const template = VALIDATION_MESSAGES.MIN_ITEMS;
    const params = { fieldName: 'opciones', minSize: 2 };
    const expectedMessage = "Debe seleccionar mínimo 2 opciones.";
    const result = formatValidationMessage(template, params);
    expect(result).toBe(expectedMessage);
  });
});