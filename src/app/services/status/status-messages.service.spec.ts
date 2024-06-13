import { TestBed } from '@angular/core/testing';
import { StatusMessagesService } from './status-messages.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { STATUS_SVG } from 'src/app/util/status.constants';
import { API_EXCEPTIONS } from 'src/app/util/api-errors.constants';
import { CONTROL_RESPONSES, getControlResponseMessage } from 'src/app/util/control-responses.constants';


describe('StatusMessagesService', () => {
  let service: StatusMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle success', () => {
    const message = 'Operación exitosa';
    const response = {};
    const result = service.handleSuccess(response, message);
    expect(result.status_svg).toBe(STATUS_SVG.SUCCESS);
    expect(result.message).toBe(message);
  });

  it('should handle BadRequest error with specific message for STARTDATE_BEFORE_CURRENTDATE_EXCEPTION_MESSAGE', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: API_EXCEPTIONS.STARTDATE_BEFORE_CURRENTDATE_EXCEPTION_MESSAGE },
      status: HttpStatusCode.BadRequest,
    });
    const nameSelect = 'elemento';
    const result = service.handleError(errorResponse, nameSelect);
    expect(result.status_svg).toBe(STATUS_SVG.WARNING);
    expect(result.message).toBe(CONTROL_RESPONSES.STARTDATE_BEFORE_CURRENTDATE);
  });

  it('should handle BadRequest error with specific message for STARTDATE_AFTER_ENDDATE_EXCEPTION_MESSAGE', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: API_EXCEPTIONS.STARTDATE_AFTER_ENDDATE_EXCEPTION_MESSAGE },
      status: HttpStatusCode.BadRequest,
    });
    const nameSelect = 'elemento';
    const result = service.handleError(errorResponse, nameSelect);
    expect(result.status_svg).toBe(STATUS_SVG.WARNING);
    expect(result.message).toBe(CONTROL_RESPONSES.STARTDATE_AFTER_ENDDATE);
  });

  it('should handle BadRequest error with specific message for DATE_VERSIONBOOTCAMP_ALREADY_USE_EXCEPTION_MESSAGE', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: API_EXCEPTIONS.DATE_VERSIONBOOTCAMP_ALREADY_USE_EXCEPTION_MESSAGE },
      status: HttpStatusCode.BadRequest,
    });
    const nameSelect = 'elemento';
    const result = service.handleError(errorResponse, nameSelect);
    expect(result.status_svg).toBe(STATUS_SVG.WARNING);
    expect(result.message).toBe(CONTROL_RESPONSES.DATE_VERSIONBOOTCAMP_ALREADY_USE);
  });


  it('should handle BadRequest error with default message', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: 'Some error message' },
      status: HttpStatusCode.BadRequest,
    });
    const nameSelect = 'elemento';
    const expectedControlMessage = getControlResponseMessage(CONTROL_RESPONSES.NAME_ALREADY_EXISTS, { name: nameSelect }); 
    const result = service.handleError(errorResponse, nameSelect);
    expect(result.status_svg).toBe(STATUS_SVG.WARNING);
    expect(result.message).toBe(expectedControlMessage);
  });

  it ('should handle Unauthorized error with credentials for login are invalid', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: API_EXCEPTIONS.CREDENTIALS_LOGIN_EXCEPTION_MESSAGE },
      status: HttpStatusCode.Unauthorized,
    });
    const result = service.handleError(errorResponse);
    expect(result.status_svg).toBe(STATUS_SVG.WARNING);
    expect(result.message).toBe(CONTROL_RESPONSES.CREDENTIALS_LOGIN_EXCEPTION);
  })
  
  it('should handle Unauthorized error', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: 'Unauthorized error message' },
      status: HttpStatusCode.Unauthorized,
    });
    const result = service.handleError(errorResponse);
    expect(result.status_svg).toBe(STATUS_SVG.WARNING);
    expect(result.message).toBe(CONTROL_RESPONSES.SESSION_EXPIRED);
  });

  it('should handle Forbidden error', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: 'Forbidden error message' },
      status: HttpStatusCode.Forbidden,
    });
    const result = service.handleError(errorResponse);
    expect(result.status_svg).toBe(STATUS_SVG.WARNING);
    expect(result.message).toBe(CONTROL_RESPONSES.NO_PERMISSIONS);
  });

  it('should handle unknown error', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: 'Some unknown error message' },
      status: HttpStatusCode.InternalServerError,
    });
    const result = service.handleError(errorResponse);
    expect(result.status_svg).toBe(STATUS_SVG.ERROR);
    expect(result.message).toBe(CONTROL_RESPONSES.UNKNOWN_ERROR);
  });
});