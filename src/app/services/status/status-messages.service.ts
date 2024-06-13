import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { CONTROL_RESPONSES, getControlResponseMessage } from 'src/app/util/control-responses.constants';
import { STATUS_SVG } from 'src/app/util/status.constants';
import { API_EXCEPTIONS } from 'src/app/util/api-errors.constants';

@Injectable({
  providedIn: 'root'
})
export class StatusMessagesService {
  dataStatus = {
    status_svg: STATUS_SVG.SUCCESS,
    message: ""
  };

  constructor() { }

  handleSuccess = (response: any, message: string): any => {
    this.dataStatus.status_svg = STATUS_SVG.SUCCESS;
    this.dataStatus.message = message;
    return this.dataStatus;
  };

  handleError = (error: HttpErrorResponse, nameSelect?: string): any => {
    let message = CONTROL_RESPONSES.UNKNOWN_ERROR;
    let svg = STATUS_SVG.ERROR;

    if (error.error.message && error.status === HttpStatusCode.BadRequest) {
      switch (error.error.message) {
        case API_EXCEPTIONS.STARTDATE_BEFORE_CURRENTDATE_EXCEPTION_MESSAGE:
          message = CONTROL_RESPONSES.STARTDATE_BEFORE_CURRENTDATE;
          svg = STATUS_SVG.WARNING;
          break;
        case API_EXCEPTIONS.STARTDATE_AFTER_ENDDATE_EXCEPTION_MESSAGE:
          message = CONTROL_RESPONSES.STARTDATE_AFTER_ENDDATE;
          svg = STATUS_SVG.WARNING;
          break;
        case API_EXCEPTIONS.DATE_VERSIONBOOTCAMP_ALREADY_USE_EXCEPTION_MESSAGE:
          message = CONTROL_RESPONSES.DATE_VERSIONBOOTCAMP_ALREADY_USE;
          svg = STATUS_SVG.WARNING;
          break;
        default:
          message = getControlResponseMessage(CONTROL_RESPONSES.NAME_ALREADY_EXISTS, { name: nameSelect ?? 'elemento' });
          svg = STATUS_SVG.WARNING;
      }
    } else if (error.status === HttpStatusCode.Unauthorized) {
      if (error.error.message === API_EXCEPTIONS.CREDENTIALS_LOGIN_EXCEPTION_MESSAGE) {
        message = CONTROL_RESPONSES.CREDENTIALS_LOGIN_EXCEPTION;
        svg = STATUS_SVG.WARNING;
      } else {
        message = CONTROL_RESPONSES.SESSION_EXPIRED;
        svg = STATUS_SVG.WARNING;
      }
    } else if (error.error.message && error.status === HttpStatusCode.Forbidden) {
      message = CONTROL_RESPONSES.NO_PERMISSIONS;
      svg = STATUS_SVG.WARNING;
    }

    this.dataStatus.message = message;
    this.dataStatus.status_svg = svg;
    return this.dataStatus;
  };
}