import { CONTROL_RESPONSES, getControlResponseMessage } from "./control-responses.constants";

describe('getControlResponseMessage', () => {
    it('should return the template when no params are provided', () => {
      const template = CONTROL_RESPONSES.STARTDATE_BEFORE_CURRENTDATE;
      const result = getControlResponseMessage(template);
      expect(result).toBe(template);
    });
  
    it('should replace the placeholders with provided params', () => {
      const template = CONTROL_RESPONSES.NAME_ALREADY_EXISTS;
      const params = { name: 'Test' };
      const expectedMessage = "Ya existe Test con ese nombre.";
      const result = getControlResponseMessage(template, params);
      expect(result).toBe(expectedMessage);
    });
  
    it('should replace multiple placeholders with provided params', () => {
      const template = "El {item} número {number} ya está en uso.";
      const params = { item: 'elemento', number: '42' };
      const expectedMessage = "El elemento número 42 ya está en uso.";
      const result = getControlResponseMessage(template, params);
      expect(result).toBe(expectedMessage);
    });
  
    it('should return the template if no matching placeholders are found', () => {
      const template = CONTROL_RESPONSES.SESSION_EXPIRED;
      const params = { nonexistent: 'value' };
      const result = getControlResponseMessage(template, params);
      expect(result).toBe(template);
    });
  
    it('should handle multiple occurrences of the same placeholder', () => {
      const template = "El {item} y el {item} son iguales.";
      const params = { item: 'valor' };
      const expectedMessage = "El valor y el valor son iguales.";
      const result = getControlResponseMessage(template, params);
      expect(result).toBe(expectedMessage);
    });
  });