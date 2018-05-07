import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../../models/userModel'

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  userData:UserModel = {
    id : '',
    conId : '',
    userName : '',
    password : '',
    emplNum : '',
    token: ''
}
  
uMod: any;
 
    
  apiUrl = 'https://localhost:44302/';

  constructor(public http: HttpClient) {
    console.log('Hello UserServiceProvider Provider');
    this.uMod = localStorage.getItem('userModel');    
 if (this.uMod != null) this.userData = JSON.parse(this.uMod);

  }

  getUsers() {
          
      
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/values').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
