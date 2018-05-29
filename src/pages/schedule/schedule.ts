import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ScheduleDetailsPage } from '../scheduledetails/scheduledetails'
import { CreateSchedulePage } from '../create-schedule/create-schedule'

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {

  schedules: any;
  loading: any;
sched: any;
today = new Date();
myDate: String = new Date().toISOString();
myDate2: String = new Date(this.today.getTime() + 60*60000).toISOString();

  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider, private loadingCtrl: LoadingController, public modalCtrl : ModalController) {
    localStorage.setItem('curAction', 'Schedule');
this.getSchedule();

  }

  public openModal(){
    console.log(this.schedules[0]);
    this.sched = this.schedules[0].SchedEvents[0];
this.sched.ChartNum = "";
this.sched.StartDt = this.myDate;
this.sched.StartTm = this.myDate;
this.sched.EndTm = this.myDate2;
this.sched.ProPay = "";
this.sched.JobCode = "";
this.sched.VstCode = "";
this.sched.AssessType = "";

    var modalPage = this.modalCtrl.create(CreateSchedulePage, {sched: this.sched}); 
    modalPage.present();
    modalPage.onDidDismiss(modalData => {
      this.getSchedule();

    });
  }   

  
  doRefresh(refresher) {
    this.getSchedule();
    refresher.complete();
    
  }
  getSchedule() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading schedule...'
  });
    this.loading.present();
    this.authServiceProvider.getData('SchedHourly/MINE')
    .then(data => {
      this.schedules = data;
     
    });
    this.loading.dismiss();
  }

 
  viewItem(msg) {
    console.log(msg);
    this.navCtrl.push(ScheduleDetailsPage, {
      msg: msg
    });
  }

}
