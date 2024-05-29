import { Injectable } from '@angular/core';
import { StatusSvg } from 'src/app/util/status.enum';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { apiErrors } from 'src/app/util/api-errors.enum';

@Injectable({
  providedIn: 'root'
})
export class StatusMessagesService {
  dataStatus = {
    status_svg: StatusSvg.SUCCESS,
    message: ""
  };

  constructor() { }

  handleSuccess = (response: any, message: string): any => {
    this.dataStatus.status_svg = StatusSvg.SUCCESS;
    this.dataStatus.message = message;
    return this.dataStatus;
  };

  handleError = (error: HttpErrorResponse, nameSelect?: string): any => {
    let message = "Error desconocido";
    let svg = StatusSvg.ERROR;

    if (error.error.message && error.status === HttpStatusCode.BadRequest) {
      switch (error.error.message) {
        case apiErrors.STARTDATE_BEFORE_CURRENTDATE_EXCEPTION_MESSAGE:
          message = "La fecha de inicio no puede ser anterior a la fecha actual.";
          svg = StatusSvg.WARNING;
          break;
        case apiErrors.STARTDATE_AFTER_ENDDATE_EXCEPTION_MESSAGE:
          message = "La fecha de inicio no puede ser posterior a la fecha de fin.";
          svg = StatusSvg.WARNING;
          break;
        case apiErrors.DATE_VERSIONBOOTCAMP_ALREADY_USE_EXCEPTION_MESSAGE:
          message = "La fecha de inicio o finalización ya está en uso para este bootcamp."
          svg = StatusSvg.WARNING;
          break;
        default:
          message = `Ya existe ${nameSelect} con ese nombre`;
          svg = StatusSvg.WARNING;
      }
    } else if (error.error.message && error.status === HttpStatusCode.Unauthorized) {
      message = "Tu sesión ha expirado, inicia nuevamente";
      svg = StatusSvg.WARNING;
    } else if (error.error.message && error.status === HttpStatusCode.Forbidden) {
      message = "No tienes permisos para realizar esta operación";
      svg = StatusSvg.WARNING;
    }

    this.dataStatus.message = message;
    this.dataStatus.status_svg = svg;
    return this.dataStatus;
  };
}