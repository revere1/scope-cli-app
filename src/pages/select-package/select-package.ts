import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { BookNowPage } from "../book-now/book-now";

/**
 * Generated class for the SelectPackagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-select-package",
  templateUrl: "select-package.html"
})
export class SelectPackagePage {
  Rupees: any;
  sName: any;
  dSlot: any;
  tSlot: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sName = this.navParams.get("sName");
    this.dSlot = this.navParams.get("dSlot");
    this.tSlot = this.navParams.get("tSlot");
    if (this.sName === "Upto 100CC") {
      this.Rupees = 350;
    } else if (this.sName === "More than 150CC") {
      this.Rupees = 450;
    } else if (this.sName === "Royal Enfield") {
      this.Rupees = 550;
    }
  }
  viewSP() {
    this.navCtrl.push(BookNowPage, {
      serName: this.sName,
      daySlot: this.dSlot,
      timeSlot: this.tSlot,
      cost: this.Rupees
    });
  }
}
