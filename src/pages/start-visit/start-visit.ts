import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController, LoadingController, ModalController } from 'ionic-angular';
import { VitalSignsPage } from '../vital-signs/vital-signs'
import { FunctionalPage } from '../functional/functional'
import { SafetyPage } from '../safety/safety'
import { PatSignaturePage } from '../pat-signature/pat-signature'
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

  payers: any;
assessTypes: any;
jobCodes: any;
vstCodes: any;
  loading: any;
vstType: any;
  schedule: any;
asmt: any;
requiredScreens: string="";
optionalScreens: string="";
completedScreens: string="";

  constructor(public navCtrl: NavController, public navParams: NavParams, public authServiceProvider: AuthServiceProvider, public viewCtrl: ViewController, private loadingCtrl: LoadingController, public modalCtrl : ModalController) {
    
    this.schedule = this.navParams.get('sched');
if (this.schedule.CompletedScreens) {
  this.completedScreens = this.schedule.CompletedScreens;

}

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartVisitPage');
    this.loading = this.loadingCtrl.create({
      content: 'Loading visit...'
  });
    this.loading.present();
    this.getAtypes();
    this.getPayers();
    this.getCodes();
    this.getVstType();
    this.loading.dismiss();
  }


  getAtypes() {
    
   
    this.authServiceProvider.getData('AppVisitType/MINE')
    .then(data => {
      this.assessTypes = data;
     
    });
    
  }

  getVstType() {
    
    
    this.authServiceProvider.getData('AppVisitType/'+this.schedule.AssessType)
    .then(data => {
      this.vstType = data;
      console.log(this.schedule.AssessType);
      if (this.vstType!=0) {
        console.log(this.vstType[0]);
        console.log(this.vstType[0].ProgramPayer);
        console.log('opt='+this.vstType[0].OptionalScreens);
        console.log('req='+this.vstType[0].RequiredScreens);
        console.log(this.schedule.ProPay);
         this.schedule.ProPay = this.vstType[0].ProgramPayer;
        
         this.schedule.VstType = this.vstType[0].VstCode;
         this.schedule.JobCode = this.vstType[0].JobCode;
         this.optionalScreens = this.vstType[0].OptionalScreens;
         this.requiredScreens = this.vstType[0].RequiredScreens;
      }
      
     
    });
    
  }

  getPayers() {

    
    console.log(this.schedule.ChartNum);
    this.authServiceProvider.getData('Payer/'+this.schedule.ChartNum)
    .then(data => {
      this.payers = data;
     
    });
    
   

    
  }


  getCodes() {
    console.log(this.schedule.ProPay);
    
    
        
    this.authServiceProvider.getData('JobCode/'+this.schedule.ProPay)
    .then(data => {
      this.jobCodes = data;
     
    });

    this.authServiceProvider.getData('VstCode/'+this.schedule.ProPay)
    .then(data => {
      this.vstCodes = data;
     
    });

    
  }


  closeModal() {
       
    this.viewCtrl.dismiss(this.schedule);
            
  
  }

  saveVisit() {
    localStorage.setItem('curAction', 'Finish Visit');
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

  
  startScreen(screen, page, type) {

    this.loading = this.loadingCtrl.create({
      content: 'Loading '+screen+'...'
  });
    this.loading.present();
    this.authServiceProvider.addData(type+'/', this.schedule).then(data => {
      var modalPage = this.modalCtrl.create(page, {asmt: data}); 
      modalPage.present();
      this.loading.dismiss();
      modalPage.onDidDismiss(modalData => {
        
           this.schedule.CompletedScreens+=type+'|';
  this.completedScreens+=type+'|';
      });
    });

    

  }
  startVitals() {
    this.startScreen("vital signs", VitalSignsPage, 'VitalSign')
            
  }

  startFunctional() {
    this.startScreen("functional", FunctionalPage, 'Functional')
         
        
  }

  startSafety() {
    this.startScreen("safety", SafetyPage, 'Safety')
         
        
  }

  startPatSignature() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading signature...'
  });
    this.loading.present();
    var modalPage = this.modalCtrl.create(PatSignaturePage, {asmt: this.schedule}); 
    this.loading.dismiss();
    modalPage.present();
    modalPage.onDidDismiss(modalData => {
        this.schedule.SignatureData = modalData.SignatureData;
      this.schedule.CompletedScreens+='Signature|';
this.completedScreens+='Signature|';

 });
         
        
  }

}
