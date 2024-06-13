export const CONTROL_RESPONSES = {
    STARTDATE_BEFORE_CURRENTDATE: "La fecha de inicio no puede ser anterior a la fecha actual.",
    STARTDATE_AFTER_ENDDATE: "La fecha de inicio no puede ser posterior a la fecha de fin.",
    DATE_VERSIONBOOTCAMP_ALREADY_USE: "La fecha de inicio o finalización ya está en uso para este bootcamp.",
    NAME_ALREADY_EXISTS: "Ya existe {name} con ese nombre.",
    CREDENTIALS_LOGIN_EXCEPTION: "Correo o contraseña incorrectos",
    SESSION_EXPIRED: "Tu sesión ha expirado, inicia nuevamente",
    NO_PERMISSIONS: "No tienes permisos para realizar esta operación",
    UNKNOWN_ERROR: "Error desconocido"
  };  
  export const getControlResponseMessage = (template: string, params?: { [key: string]: string }): string => {
    if (!params) return template;
    return Object.keys(params).reduce((message, key) => {
      const regex = new RegExp(`{${key}}`, 'g');
      return message.replace(regex, params[key]);
    }, template);
  };