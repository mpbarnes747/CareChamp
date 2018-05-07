import { Component } from '@angular/core';

import { SchedulePage } from '../schedule/schedule';
import { MessagesPage } from '../messages/messages';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SchedulePage;
  tab3Root = MessagesPage;

  constructor() {

  }
}
