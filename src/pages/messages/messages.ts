import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { MessageDetailsPage } from '../messagedetails/messagedetails'

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {
  
  messages: any;
  params: Object;
  pushPage: any;

  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider) {

    this.getMessages();
  }

  getMessages() {
    this.authServiceProvider.getData('ToDoList/')
    .then(data => {
      this.messages = data;
      
    });
  }

  viewItem(event, msg) {
    this.navCtrl.push(MessageDetailsPage, {
      msg: msg
    });
  }

}
