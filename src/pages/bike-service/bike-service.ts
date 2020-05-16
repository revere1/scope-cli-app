import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { ViewPackagePage } from "../view-package/view-package";
/**
 * Generated class for the BikeServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-bike-service",
  templateUrl: "bike-service.html"
})
export class BikeServicePage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  viewPP() {
    // console.log("This is ")
    this.navCtrl.push(ViewPackagePage);
  }
}
