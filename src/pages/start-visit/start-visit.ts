import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController, LoadingController, ModalController } from 'ionic-angular';
import { VitalSignsPage } from '../vital-signs/vital-signs'
import { FunctionalPage } from '../functional/functional'
import { SafetyPage } from '../safety/safety'
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DomElementSchemaRegistry } from '@angular/compiler';
/**
 * Generated class for the StartVisitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-start-visit',
  templateUrl: 'start-visit.html',
})
export class StartVisitPage {

  loading: any;
  schedule: any;
asmt: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authServiceProvider: AuthServiceProvider, public viewCtrl: ViewController, private loadingCtrl: LoadingController, public modalCtrl : ModalController) {
  
    this.schedule = this.navParams.get('sched');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartVisitPage');
    this.loading = this.loadingCtrl.create({
      content: 'Starting visit...'
  });
    this.loading.present();
   
    this.loading.dismiss();
  }

  closeModal() {
       
    this.viewCtrl.dismiss(this.schedule);
            
  
  }

  saveVisit() {
    this.loading = this.loadingCtrl.create({
      content: 'Saving visit...'
  });
    this.loading.present();
    console.log(this.schedule);
    this.authServiceProvider.updateData('Assessment/MINE', this.schedule)
    .then(data => {
      console.log(data);
      console.log(this.schedule);
           this.loading.dismiss();
      /*Save assessment */
    this.viewCtrl.dismiss(this.schedule);
      
    });
  }
  startVitals() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading vitals...'
  });
    this.loading.present();
    var modalPage = this.modalCtrl.create(VitalSignsPage); 
    modalPage.present();
    this.loading.dismiss();
         
        
  }

  startFunctional() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading functional...'
  });
    this.loading.present();
    var modalPage = this.modalCtrl.create(FunctionalPage); 
    modalPage.present();
    this.loading.dismiss();
         
        
  }

  startSafety() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading safety...'
  });
    this.loading.present();
    var modalPage = this.modalCtrl.create(SafetyPage); 
    modalPage.present();
    this.loading.dismiss();
         
        
  }

}
