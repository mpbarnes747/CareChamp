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

  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider, private loadingCtrl: LoadingController, public modalCtrl : ModalController) {
  
this.getSchedule();

  }

  public openModal(){
    var modalPage = this.modalCtrl.create(CreateSchedulePage); 
    modalPage.present();
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
