import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ParametresService } from '../services/parametres.service';
import { catchError, mergeMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TokeninterseptService implements HttpInterceptor {

  constructor(private paramService: ParametresService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let promise = this.paramService.getToken();

    return from(promise).pipe(mergeMap(token => {
      let newRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
      return next.handle(newRequest)
    }))
  }
}
