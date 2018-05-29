import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the CreateSchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-create-schedule',
  templateUrl: 'create-schedule.html',
})
export class CreateSchedulePage {

  schedule: any;
  today = new Date();
  pats: any;
  payers: any;
assessTypes: any;
jobCodes: any;
vstCodes: any;
  loading: any;
vstType: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public authServiceProvider: AuthServiceProvider, private loadingCtrl: LoadingController) {

    this.schedule = this.navParams.get('sched');
    
this.getPats();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateSchedulePage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  saveSchedule() {

    this.loading = this.loadingCtrl.create({
      content: 'Scheduling visit...'
  });
    this.loading.present();

    this.authServiceProvider.addData('SchedHourly/', this.schedule)
    .then(data => {
      console.log(data);
      
    });
    this.loading.dismiss();
    this.viewCtrl.dismiss();
  }

  getPats() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading patients...'
  });
    this.loading.present();
    this.authServiceProvider.getData('Patient/MINE')
    .then(data => {
      this.pats = data;
     
    });
    this.authServiceProvider.getData('AppVisitType/MINE')
    .then(data => {
      this.assessTypes = data;
     
    });
    this.loading.dismiss();
  }

  getVstType() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading visit type...'
  });
    this.loading.present();
    
    this.authServiceProvider.getData('AppVisitType/'+this.schedule.AssessType)
    .then(data => {
      this.vstType = data;
      if (this.vstType!=0) {
        console.log(this.vstType[0]);
        console.log(this.vstType[0].ProgramPayer);
        console.log(this.schedule.ProPay);
         this.schedule.ProPay = this.vstType[0].ProgramPayer;
         this.getCodes();
         this.schedule.VstCode = this.vstType[0].VstCode;
         this.schedule.JobCode = this.vstType[0].JobCode;
      }
      
     
    });
    this.loading.dismiss();
  }

  getPayers() {

    this.loading = this.loadingCtrl.create({
      content: 'Loading payers...'
  });
    this.loading.present();
    console.log(this.schedule.ChartNum);
    this.authServiceProvider.getData('Payer/'+this.schedule.ChartNum)
    .then(data => {
      this.payers = data;
     
    });
    
   

    this.loading.dismiss();
  }


  getCodes() {
    console.log(this.schedule.ProPay);
    this.loading = this.loadingCtrl.create({
      content: 'Loading codes...'
  });
    this.loading.present();
    console.log(this.schedule.ProPay);
        
    this.authServiceProvider.getData('JobCode/'+this.schedule.ProPay)
    .then(data => {
      this.jobCodes = data;
     
    });

    this.authServiceProvider.getData('VstCode/'+this.schedule.ProPay)
    .then(data => {
      this.vstCodes = data;
     
    });

    this.loading.dismiss();
  }

}
