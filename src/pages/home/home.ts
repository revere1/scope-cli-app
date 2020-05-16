import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { MyOrderPage } from '../my-order/my-order';
import { LocationPage } from '../location/location';
import { BikeServicePage } from '../bike-service/bike-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private app: App) {
    
  }
  loc(){
    this.navCtrl.push(LocationPage)
  }
  signin(){
    this.navCtrl.setRoot(MyOrderPage);
  }
  bike(){
    this.navCtrl.push(BikeServicePage)
  }
}
