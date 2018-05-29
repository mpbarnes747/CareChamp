import { Component } from '@angular/core';
import { NavController, App, ModalController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { Network } from '@ionic-native/network';
import { UserSettingsPage } from '../../pages/user-settings/user-settings';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  curUser: any;
email: any = ""
userName: any = ""
profilePicture: any = "https://www.gravatar.com/avatar/"
isConnected: boolean = true;


  constructor(public navCtrl: NavController, public authService:AuthServiceProvider, public app: App, public locationTracker: LocationTrackerProvider, private network: Network, public modalCtrl : ModalController) {

    
 this.getUser();
 this.locationTracker.startTracking();

 

 let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
  console.log('network was disconnected :-(');
  this.isConnected=false;
});

let connectSubscription = this.network.onConnect().subscribe(() => {
  console.log('network connected!');
  this.isConnected=true;
  // We just got a connection but we need to wait briefly
   // before we determine the connection type. Might need to wait.
  // prior to doing any api requests as well.
  setTimeout(() => {
    if (this.network.type === 'wifi') {
      console.log('we got a wifi connection, woohoo!');
    }
  }, 3000);
});
}



ionViewWillUnload() {
  
  
  

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

start(){
  this.locationTracker.startTracking();
}

stop(){
  this.locationTracker.stopTracking();
}

showUser() {
  var modalPage = this.modalCtrl.create(UserSettingsPage); 
        modalPage.present();
        modalPage.onDidDismiss(modalData => {
         

        });
}
}