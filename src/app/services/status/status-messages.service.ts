import { Injectable } from '@angular/core';
import { StatusSvg } from 'src/app/util/status.enum';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusMessagesService {
  dataStatus = {
    status_svg: StatusSvg.SUCCESS,
    message: ""
  }

  constructor() { }

  handleSuccess(response: any, message: string): any {
    this.dataStatus.status_svg = StatusSvg.SUCCESS;
    this.dataStatus.message = message;
    return this.dataStatus;
  }

  handleError(error: HttpErrorResponse, nameSelect?: string): any {
    let message = "Error desconocido";
    let svg = StatusSvg.ERROR;
    switch (error.status) {
      case HttpStatusCode.BadRequest:
        console.log(error);
        message = `Ya existe ${nameSelect} con ese nombre`;
        svg = StatusSvg.WARNING;
        break;
      case HttpStatusCode.Unauthorized:
        message = "Tu sesión ha expirado, inicia nuevamente";
        break;
      case HttpStatusCode.Forbidden:
        message = "No tienes permisos para realizar esta operación";
        break;
    }
    this.dataStatus.message = message;
    this.dataStatus.status_svg = svg;
    return this.dataStatus;
  }
}
