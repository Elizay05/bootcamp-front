export const VALIDATION_MESSAGES = {
    REQUIRED: "ⓘ El campo {fieldName} es obligatorio.",
    MINLENGTH: "ⓘ El campo {fieldName} debe tener al menos {requiredLength} caracteres.",
    MAXLENGTH: "ⓘ El campo {fieldName} no debe exceder los {requiredLength} caracteres.",
    EMAIL: "ⓘ El campo {fieldName} no es válido.",
    PATTERN: "ⓘ El campo {fieldName} no es válido.",
    SELECT_ITEMS: "Seleccione las {fieldName}.",
    MIN_ITEMS: "Debe seleccionar mínimo {minSize} {fieldName}.",
    MAX_ITEMS: "Debe seleccionar máximo {maxSize} {fieldName}."
  };
  
  export const formatValidationMessage = (template: string, params?: { [key: string]: string | number }): string => {
    if (!params) return template;
    return Object.keys(params).reduce((message, key) => {
      const regex = new RegExp(`{${key}}`, 'g');
      return message.replace(regex, params[key] as string);
    }, template);
};