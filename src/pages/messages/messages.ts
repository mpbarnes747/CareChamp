import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { MessageDetailsPage } from '../messagedetails/messagedetails'

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {
  
  messages: any;
  loading: any;

  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider, private loadingCtrl: LoadingController) {
    
    this.getMessages();
  }

  getMessages() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading messages...'
  });
    this.loading.present();
    this.authServiceProvider.getData('ToDoList/MINE')
    .then(data => {
      this.messages = data;
      
    });
    this.loading.dismiss();
  }

  viewItem(msg) {
    console.log(msg);
    this.navCtrl.push(MessageDetailsPage, {
      msg: msg
    });
  }

}
