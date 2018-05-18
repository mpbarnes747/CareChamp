import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import 'rxjs/add/operator/filter';

/*
  Generated class for the LocationTrackerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationTrackerProvider {

  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
public spd: number = 0;
public lastUpdateTime;

tracking: any;

  constructor(public zone: NgZone, public authServiceProvider: AuthServiceProvider, private backgroundGeolocation: BackgroundGeolocation, private geolocation: Geolocation) {
    console.log('Hello LocationTrackerProvider Provider');
  }

  initTracking() {
    this.authServiceProvider.getData('AppUserTracking/MINE')
    .then(data => {
      this.tracking = data;
     
    });
  }

  startTracking() {
 
     let config = {
      desiredAccuracy: 0,
      stationaryRadius: 50,
      distanceFilter: 100,
      debug: true,
      interval: 2000
    };
   
    this.backgroundGeolocation.configure(config).subscribe((location) => {
   
      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
   
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
this.spd = location.speed;
this.logTracking();

      });
   
    }, (err) => {
   
      console.log(err);
   
    });
   
    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();
   
   
    // Foreground Tracking
   
  let options = {
    frequency: 3000,
    enableHighAccuracy: true
  };
   
  this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
   
    console.log(position);
   
    // Run update inside of Angular's zone
    this.zone.run(() => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.spd = position.coords.speed;
    this.logTracking();
    });
   
  });

  }
 
  logTracking() {
    var now = new Date();
    if(this.lastUpdateTime && now.getTime() - this.lastUpdateTime.getTime() < (60000*.5)){
        console.log("Ignoring position update");
        return;
    }
    this.lastUpdateTime = now;
    if (this.tracking) {

    }
    else {
    this.initTracking();
    }
    
    if (this.tracking) {
    this.tracking.Latitude = this.lat;
    this.tracking.Longitude = this.lng;
    this.tracking.Speed = this.spd;
    console.log(this.tracking);
    this.authServiceProvider.addData('AppUserTracking/', this.tracking)
        .then(data => {
          console.log(data);
          
        });
    }
    else {
      console.log("Couldn't send position.");
    }

  }
  stopTracking() {
 
 console.log('stopTracking');
 
  this.backgroundGeolocation.finish();
  this.watch.unsubscribe();

  }

}
