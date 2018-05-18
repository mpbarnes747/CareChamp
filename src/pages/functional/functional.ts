import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FunctionalPage');
  }

  closeModal() {
    /*Save assessment */
    this.viewCtrl.dismiss();
  }

  saveFunctional() {
    this.viewCtrl.dismiss();
  }

}
