import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor () { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU5JU1RSQVRPUiIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcxNzA5ODcwNiwiZXhwIjoxNzE3MTAwMTQ2fQ.C-UYAdlIBtuJGmX8xwLF_-SOPJ5ZC9Bx8ca_gPh22Ac';
        if (accessToken) {
            const modifiedRequest = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return next.handle(modifiedRequest);
        }
        return next.handle(request);
    }
}