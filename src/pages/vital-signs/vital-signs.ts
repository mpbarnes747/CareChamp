import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the VitalSignsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vital-signs',
  templateUrl: 'vital-signs.html',
})
export class VitalSignsPage {

  
asmt: any;
loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private loadingCtrl: LoadingController, public authServiceProvider: AuthServiceProvider) {

    this.asmt = this.navParams.get('asmt');  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VitalSignsPage');
  }

  closeModal() {
    /*Save assessment */
    this.viewCtrl.dismiss();
  }

  
  saveVitals() {
    
    this.loading = this.loadingCtrl.create({
      content: 'Saving vital signs...'
  });
    this.loading.present();
    console.log(this.asmt);
    this.authServiceProvider.updateData('VitalSign/MINE', this.asmt)
    .then(data => {
      console.log(data);
      
           this.loading.dismiss();
      /*Save assessment */
    this.viewCtrl.dismiss(this.asmt);
      
    });
  }
}
