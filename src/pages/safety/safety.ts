import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SafetyPage');
  }

  closeModal() {
    /*Save assessment */
    this.viewCtrl.dismiss();
  }

  saveSafety() {
    this.viewCtrl.dismiss();
  }

}
