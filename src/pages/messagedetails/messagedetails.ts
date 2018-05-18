import { Component } from '@angular/core';
import { NavParams, NavController, LoadingController  } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToDoListModel } from '../../models/toDoListModel';

@Component({
  selector: 'page-messagedetails',
  templateUrl: 'messagedetails.html'
})
export class MessageDetailsPage {
  
   messages: any;
message: any;
item:any
loading: any;
editorMsg: any;

  constructor( public navCtrl: NavController, public navParams:NavParams, public authServiceProvider: AuthServiceProvider, private loadingCtrl: LoadingController) 
  {
   
    this.message = this.navParams.get('msg');  
    
    if (this.message) {
      console.log(this.message.ChartNum);
      
    
      this.getMessages();
     

    }
    else {
      console.log(this.message);
    }

  }

  
  getMessages() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading messages...'
  });
    this.loading.present();
    this.authServiceProvider.getData('ToDoList/'+this.message.EmpTo+this.message.EmpFrom)
    .then(data => {
      this.messages = data;
      
    });
    this.loading.dismiss();
  }

  sendMsg() {
    this.loading = this.loadingCtrl.create({
      content: 'Sending message...'
  });
    this.loading.present();
    this.message.Message = this.editorMsg;
    console.log(this.message);
        
    this.authServiceProvider.addData('ToDoList/', this.message)
    .then(data => {
      console.log(data);
      
    });
    this.loading.dismiss().th;
         this.getMessages();
        
  }
}
