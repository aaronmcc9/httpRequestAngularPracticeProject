import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class LoggingInterceptorService implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("request in process");

        return next.handle(req)
        .pipe(tap(event => {

            console.log(event.type);
            if(event.type === HttpEventType.Response){
                console.log("Response Data:");
                console.log(event.body);
            }
        }));
    }
}