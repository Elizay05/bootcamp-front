import { TestBed } from '@angular/core/testing';
import { StatusMessagesService } from './status-messages.service';
import { StatusSvg } from 'src/app/util/status.enum';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { apiErrors } from 'src/app/util/api-errors.enum';


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
    expect(result.status_svg).toBe(StatusSvg.SUCCESS);
    expect(result.message).toBe(message);
  });

  it('should handle BadRequest error with specific message for STARTDATE_BEFORE_CURRENTDATE_EXCEPTION_MESSAGE', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: apiErrors.STARTDATE_BEFORE_CURRENTDATE_EXCEPTION_MESSAGE },
      status: HttpStatusCode.BadRequest,
    });
    const nameSelect = 'elemento';
    const result = service.handleError(errorResponse, nameSelect);
    expect(result.status_svg).toBe(StatusSvg.WARNING);
    expect(result.message).toBe('La fecha de inicio no puede ser anterior a la fecha actual.');
  });

  it('should handle BadRequest error with specific message for STARTDATE_AFTER_ENDDATE_EXCEPTION_MESSAGE', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: apiErrors.STARTDATE_AFTER_ENDDATE_EXCEPTION_MESSAGE },
      status: HttpStatusCode.BadRequest,
    });
    const nameSelect = 'elemento';
    const result = service.handleError(errorResponse, nameSelect);
    expect(result.status_svg).toBe(StatusSvg.WARNING);
    expect(result.message).toBe('La fecha de inicio no puede ser posterior a la fecha de fin.');
  });

  it('should handle BadRequest error with specific message for DATE_VERSIONBOOTCAMP_ALREADY_USE_EXCEPTION_MESSAGE', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: apiErrors.DATE_VERSIONBOOTCAMP_ALREADY_USE_EXCEPTION_MESSAGE },
      status: HttpStatusCode.BadRequest,
    });
    const nameSelect = 'elemento';
    const result = service.handleError(errorResponse, nameSelect);
    expect(result.status_svg).toBe(StatusSvg.WARNING);
    expect(result.message).toBe('La fecha de inicio o finalización ya está en uso para este bootcamp.');
  });


  it('should handle BadRequest error with default message', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: 'Some error message' },
      status: HttpStatusCode.BadRequest,
    });
    const nameSelect = 'elemento';
    const result = service.handleError(errorResponse, nameSelect);
    expect(result.status_svg).toBe(StatusSvg.WARNING);
    expect(result.message).toBe('Ya existe elemento con ese nombre');
  });

  it('should handle Unauthorized error', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: 'Unauthorized error message' },
      status: HttpStatusCode.Unauthorized,
    });
    const result = service.handleError(errorResponse);
    expect(result.status_svg).toBe(StatusSvg.WARNING);
    expect(result.message).toBe('Tu sesión ha expirado, inicia nuevamente');
  });

  it('should handle Forbidden error', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: 'Forbidden error message' },
      status: HttpStatusCode.Forbidden,
    });
    const result = service.handleError(errorResponse);
    expect(result.status_svg).toBe(StatusSvg.WARNING);
    expect(result.message).toBe('No tienes permisos para realizar esta operación');
  });

  it('should handle unknown error', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: 'Some unknown error message' },
      status: HttpStatusCode.InternalServerError,
    });
    const result = service.handleError(errorResponse);
    expect(result.status_svg).toBe(StatusSvg.ERROR);
    expect(result.message).toBe('Error desconocido');
  });
});