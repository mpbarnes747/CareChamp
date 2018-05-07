import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let apiUrl = 'https://www.barnestorm.biz:90/Dapi/api/';
let apiUrl2 = 'https://localhost:44302/Dapi/api/';

@Injectable()
export class AuthServiceProvider {

  token: any;

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
      headers.append('Accept', 'application/json');
                    this.http.post(apiUrl+type, credentials, {headers: headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

       

  }

  getData(type) {
    this.token = JSON.parse(localStorage.getItem('accTok'));    
  
    let headers = new HttpHeaders();
headers = headers.set('Authorization', 'Bearer ' + this.token);
    const httpOptions = {
      headers: headers
    };
        return new Promise(resolve => {
            this.http.get(apiUrl+type, httpOptions).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  
       

  
  
}
