import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the FunctionalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-functional',
  templateUrl: 'functional.html',
})
export class FunctionalPage {

  actPerm: Array<string>;
  funcLim: Array<string>;
loading: any;
asmt: any;
cbHBCodes: any;
cbFLCodes: any;
cbAPCodes: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private loadingCtrl: LoadingController, public authServiceProvider: AuthServiceProvider) {
    this.asmt = this.navParams.get('asmt'); 
    this.getCodes();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FunctionalPage');
  }

  getCodes() {

    
    this.authServiceProvider.getData('CheckBoxCode/FunctionalStat1')
    .then(data => {
      this.cbHBCodes = data;
     
    });
    
    this.authServiceProvider.getData('CheckBoxCode/48518A')
    .then(data => {
      this.cbFLCodes = data;
     
    });
   
    this.authServiceProvider.getData('CheckBoxCode/48518B')
    .then(data => {
      this.cbAPCodes = data;
     
    });

    
  }

  closeModal() {
    /*Save assessment */
    this.viewCtrl.dismiss();
  }

  
  saveFunctional() {
    
    this.loading = this.loadingCtrl.create({
      content: 'Saving functional...'
  });
    this.loading.present();
    console.log(this.asmt);
    this.authServiceProvider.updateData('Functional/MINE', this.asmt)
    .then(data => {
      console.log(data);
      
           this.loading.dismiss();
      /*Save assessment */
    this.viewCtrl.dismiss(this.asmt);
      
    });
  }

}
