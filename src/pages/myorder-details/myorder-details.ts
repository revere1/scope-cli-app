import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { Http, RequestOptions, Headers } from '@angular/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Global } from '../../Global';
import { MyOrderPage } from '../my-order/my-order';

/**
 * Generated class for the MyorderDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myorder-details',
  templateUrl: 'myorder-details.html',
})
export class MyorderDetailsPage {
   bookId: any;
   userId: any;
   details: any;
   detailsArray = [];
   status: any;
   Rupees: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http: Http,
    private toast: ToastController) {
    //  this.Rupees =Global.Rupees;
     this.bookId = this.navParams.get('bid')
     this.userId = this.navParams.get('uid')
     this.http.get(`${Global.url}customerbookings/details/${this.userId}/${this.bookId}`).subscribe(
      getData =>{
         this.details = getData.json().result;
         this.status = this.details.status;
         this.detailsArray.push(this.details);
        if(this.detailsArray[0].status === 200){
        const toast = this.toast.create({
          message: this.details.Message,
          duration: 2000
        });
        toast.present();
      }
      }, err =>{
        alert(this.details.Message)
      })
  }
  cancelOrder(){
    const headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    const getApiUrl: string = `${Global.url}customerbookings/cancel/${this.details.id_user}/${this.details.id_book_services}`;
    this.http.patch(getApiUrl, options).subscribe(
      getData =>{
        var cancelOrderDetails = getData.json();
        if(cancelOrderDetails.status === 200){
        const toast = this.toast.create({
          message: cancelOrderDetails.Message,
          duration: 2000
        });
        toast.present();
          this.navCtrl.setRoot(MyOrderPage)
      }
      })
  }
}
