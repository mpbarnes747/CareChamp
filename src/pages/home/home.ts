import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  curUser: any;
email: any = ""
userName: any = ""
profilePicture: any = "https://www.gravatar.com/avatar/"

  constructor(public navCtrl: NavController, public authService:AuthServiceProvider, public app: App) {
      
 this.getUser();
 
}

logout(){
    localStorage.clear();
    this.app.getRootNav().setRoot(LoginPage);
   
}

getUser() {
  this.authService.getData('AppUser/ME')
  .then(data => {
    this.curUser = data;
    if (this.curUser) {
      this.email = this.curUser.EmailMd5;
      this.userName = this.curUser.UserName;
      this.profilePicture = "https://www.gravatar.com/avatar/" + this.email;
    }
  });
}

}