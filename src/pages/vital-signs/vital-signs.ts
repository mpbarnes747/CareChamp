import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

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

  sysBp: number = 80;
  diaBp: number = 120;
  temp: number = 98.6;
  resp: number = 40;
  pulse: number = 60;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VitalSignsPage');
  }

  closeModal() {
    /*Save assessment */
    this.viewCtrl.dismiss();
  }

  saveVitals() {
    this.viewCtrl.dismiss();
  }
}
