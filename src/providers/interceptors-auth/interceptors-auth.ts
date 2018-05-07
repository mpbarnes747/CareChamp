import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { App } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import 'rxjs/add/operator/do';

/*
  Generated class for the InterceptorsAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InterceptorsAuthProvider implements HttpInterceptor {

   
uMod: any;
 

 
  constructor( public app: App) {
    
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(req);
     
    };

  


  

}
