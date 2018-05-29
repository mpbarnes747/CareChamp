import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the SafetyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-safety',
  templateUrl: 'safety.html',
})
export class SafetyPage {

  loading: any;
  asmt: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private loadingCtrl: LoadingController, public authServiceProvider: AuthServiceProvider) {
    this.asmt = this.navParams.get('asmt');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SafetyPage');
  }

  closeModal() {
    /*Save assessment */
    this.viewCtrl.dismiss();
  }

    saveSafety() {
    
    this.loading = this.loadingCtrl.create({
      content: 'Saving safety...'
  });
    this.loading.present();
    console.log(this.asmt);
    this.authServiceProvider.updateData('Safety/MINE', this.asmt)
    .then(data => {
      console.log(data);
      
           this.loading.dismiss();
      /*Save assessment */
    this.viewCtrl.dismiss(this.asmt);
      
    });
  }

}
