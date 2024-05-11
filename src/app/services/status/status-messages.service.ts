import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatusModalComponent } from '../../atomic-design/molecules/status-modal/status-modal.component';
import { StatusSvg } from 'src/app/util/status.enum';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusMessagesService {
  constructor(private dialog: MatDialog) { }

  handleSuccess(response: any, message: string): void {
    this.dialog.open(StatusModalComponent, {
      data: { status_svg: StatusSvg.SUCCESS, message: message }
    });
  }

  handleError(error: HttpErrorResponse, nameSelect?: string): void {
    let message = "Error desconocido";
    let svg = StatusSvg.ERROR;
    switch (error.status) {
      case HttpStatusCode.BadRequest:
        message = `Ya existe una ${nameSelect} con ese nombre}`;
        svg = StatusSvg.WARNING;
        break;
      case HttpStatusCode.Unauthorized:
        message = "Tu sesión ha expirado, inicia nuevamente";
        break;
      case HttpStatusCode.Forbidden:
        message = "No tienes permisos para realizar esta operación";
        break;
    }
    this.dialog.open(StatusModalComponent, {
      data: { status_svg: svg, message: message }
    });
  }
}
