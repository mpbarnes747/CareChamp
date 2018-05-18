import { Component } from '@angular/core';

import { SchedulePage } from '../schedule/schedule';
import { MessagesPage } from '../messages/messages';
import { HomePage } from '../home/home';
import { LocatorPage } from '../locator/locator';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SchedulePage;
  tab3Root = MessagesPage;
  tab4Root = LocatorPage;

  appTabs: any;

  constructor() {
this.appTabs = JSON.parse(localStorage.getItem('appTabs')); 

  }
}
