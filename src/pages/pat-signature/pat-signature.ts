import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the PatSignaturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pat-signature',
  templateUrl: 'pat-signature.html',
})
export class PatSignaturePage {

  @ViewChild(SignaturePad) public signaturePad : SignaturePad;

    public signatureImage : string;
asmt: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private screenOrientation: ScreenOrientation, public authServiceProvider: AuthServiceProvider) {
    this.asmt = this.navParams.get('asmt');  
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.screenOrientation.onChange().subscribe(
      () => {
          console.log("Orientation Changed");
          this.canvasResize();
          
      }
   );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatSignaturePage');
    
    this.signaturePad.fromDataURL(this.asmt.SignatureData);
    this.canvasResize();
  }

     drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    this.asmt.SignatureData = this.signatureImage;
console.log(this.asmt.SignatureText);

this.authServiceProvider.updateData('Assessment/MINE', this.asmt)
.then(data => {
  
  /*Save assessment */
this.viewCtrl.dismiss(this.asmt);
  
});
  }

  drawClear() {
    this.signaturePad.clear();
  }

  canvasResize() {
   let ratio =  Math.max(window.devicePixelRatio || 1, 1)
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth * ratio);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight * ratio);
    canvas.getContext("2d").scale(ratio, ratio);
    
    this.signaturePad.clear();
  }
  
  closeModal() {
    /*Save assessment */
    this.viewCtrl.dismiss();
  }
  
  saveVisit() {
    
    
  }

}
