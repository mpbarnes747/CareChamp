import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ToDoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToDoServiceProvider {

  apiUrl = 'https://www.barnestorm.biz:90/Dapi/api/ToDoList';
apiUrl2 = 'https://localhost:44302/Dapi/api/ToDoList/';

token: any;

  constructor(public http: HttpClient) {
    console.log('Hello ToDoServiceProvider Provider');
    
  }

  getMessages() {
    this.token = JSON.parse(localStorage.getItem('accTok'));    
  
    let headers = new HttpHeaders();
headers = headers.set('Authorization', 'Bearer ' + this.token);
    const httpOptions = {
      headers: headers
    };
        return new Promise(resolve => {
            this.http.get(this.apiUrl, httpOptions).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addUser(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/users', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}


  

