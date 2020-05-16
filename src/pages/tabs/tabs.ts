import { Component } from '@angular/core';

import { MyOrderPage } from '../my-order/my-order';

import { ListPage } from '../list/list';
import { HomePage } from '../home/home';
import { MyprofilePage } from '../myprofile/myprofile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MyOrderPage;
  tab3Root = MyprofilePage;

  constructor() {

  }
}
