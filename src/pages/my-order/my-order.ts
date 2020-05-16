import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';

import { Http } from '@angular/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Global } from '../../Global';
import { MyorderDetailsPage } from '../myorder-details/myorder-details';
import moment from 'moment';

/**
 * Generated class for the MyOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-order',
  templateUrl: 'my-order.html',
})
export class MyOrderPage {
  orders: boolean = false;
  myOrderData: boolean = false;
  order1: any;
  pet: string = "order";
  list: string = "list1";
  myorders: any;
  kesava: any;
  Rupees: any;
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public http: Http,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    private toast: ToastController
    ) {

  }

  ngOnInit(){
    this.Rupees = Global.Rupees;
    this.order();
  }
  order(){
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...',
      duration: 3000
    });

     // Show the popup
  loadingPopup.present()
    const userId = Global.userId;
    this.http.get(`${Global.url}customerbookings/`+userId).subscribe(
      getData =>{
        setTimeout(() => {
          loadingPopup.dismiss();
        }, 500);
        this.myorders = getData.json().result;
        if (this.myorders.length === 0 || this.myorders === 'no records found') {
          this.myOrderData = true;
          return false;
        }
        this.myOrderData = true;
      })
  }

  viewSP(bookId,userId){
    this.navCtrl.push(MyorderDetailsPage,{bid: bookId, uid: userId})
  }
}
