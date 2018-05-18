import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams, NavController, LoadingController, ModalController  } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Geolocation } from '@ionic-native/geolocation';
import { StartVisitPage } from '../start-visit/start-visit'

declare var google;

@Component({
  selector: 'page-scheduledetails',
  templateUrl: 'scheduledetails.html'
})
export class ScheduleDetailsPage {
  
  

  schedule: any;
  assessment: any;
item:any
loading: any;
editorMsg: any;
directionsService = new google.maps.DirectionsService;
directionsDisplay = new google.maps.DirectionsRenderer;
public lastUpdateTime;

@ViewChild('map') mapElement: ElementRef;
    @ViewChild('directionsPanel') directionsPanel: ElementRef;
    map: any;

  constructor( public navCtrl: NavController, public navParams:NavParams, public authServiceProvider: AuthServiceProvider, private geolocation: Geolocation, private loadingCtrl: LoadingController, public modalCtrl : ModalController) 
  {
   
    this.schedule = this.navParams.get('msg');  
    
   

  }

  ionViewDidLoad(){
    
    
        
    
    

}

ionViewWillUnload() {
  

}

loadMap(){

  this.loading = this.loadingCtrl.create({
    content: 'Loading directions...'
});
  this.loading.present();

  this.map = new google.maps.Map(this.mapElement.nativeElement, {
    zoom: 15,
    center: this.schedule.PatAddress,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
    let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
    this.map.setCenter(mylocation);
  });
    

    let watch = this.geolocation.watchPosition();
  watch.subscribe((data) => {
    var now = new Date();
    if(this.lastUpdateTime && now.getTime() - this.lastUpdateTime.getTime() < (60000*1)){
        console.log("Ignoring position update");
        return;
    }
    this.lastUpdateTime = now;
        let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
    
    console.log(updatelocation);
    this.loading.dismiss().then(() => {
                    
      this.startNavigating(updatelocation);
 });
    
  });

  
}

startNavigating(uLoc){

   

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(this.directionsPanel.nativeElement);
    this.directionsDisplay
    this.directionsService.route({
        origin: uLoc,
        destination: this.schedule.PatAddress,
        travelMode: google.maps.TravelMode['DRIVING']
    }, (res, status) => {

        if(status == google.maps.DirectionsStatus.OK){
          this.directionsDisplay.setDirections(res);
        } else {
            console.warn(status);
        }

    });

}
  

  startVisit() {
    this.loading = this.loadingCtrl.create({
      content: 'Starting visit...'
  });
    this.loading.present();

    this.authServiceProvider.addData('Assessment/', this.schedule)
    .then(data => {
      console.log(data);
      this.assessment = data;
      this.loading.dismiss().then(() => {
                        
        var modalPage = this.modalCtrl.create(StartVisitPage, {sched: this.assessment}); 
        modalPage.present();
        modalPage.onDidDismiss(modalData => {
          this.schedule.AssessStartDate =  modalData.StartDt.toLocaleDateString();
this.schedule.AssessStartTime = modalData.StartTm.toLocaleTimeString();;
        });
   });
      
      
    });
   
  
   
    
             
        
  }
}
