import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  token : any;
 userName: any;
 password: any;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthServiceProvider, public toastCtrl:ToastController, private loadingCtrl: LoadingController) {
  this.loading = this.loadingCtrl.create({
    content: 'Authenticating...'
});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.loading.present();
    if(this.userName && this.password){
      let authObject = "Username="+this.userName+"&Password="+this.password;
    this.authService.postData(authObject,'login').then((result) => {
      this.token = result;
      
      if(this.token){
                  localStorage.setItem('accTok', JSON.stringify(this.token));
                  this.loading.dismiss().then(() => {
                    
                    this.navCtrl.setRoot(TabsPage, {}, {animate: true, direction: 'forward'});
               });
     
      }
      else{ this. presentToast("Give valid details"); }
    }, (err) => {
      // Error log
    });
  }
  else{
    this. presentToast("Enter username and password.");
  }

  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
