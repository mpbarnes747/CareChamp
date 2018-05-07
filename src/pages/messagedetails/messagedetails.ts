import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-messagedetails',
  templateUrl: 'messagedetails.html'
})
export class MessageDetailsPage {
  
  messages: any;
message: any;

  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider,public navParams:NavParams) 
  {
    this.message = navParams.get('msg');  
    if (this.message) {
      this.getMessages();
    }
    

  }

  getMessages() {
    this.authServiceProvider.getData('ToDoList/'+this.message.EmpTo+this.message.EmpFrom)
    .then(data => {
      this.messages = data;
      
    });
  }

}
