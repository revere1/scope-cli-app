import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AddAddressPage } from '../add-address/add-address';
import { EditAddressPage } from '../edit-address/edit-address';
import { Global } from '../../Global';
import { MyprofilePage } from '../myprofile/myprofile';

/**
 * Generated class for the ManageAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-address',
  templateUrl: 'manage-address.html',
})
export class ManageAddressPage {
  manageAddress: any;
  mobile: number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private http: Http,
    private toast: ToastController
    ) {
  }

  ngOnInit(){
    this.manageAddressList();
  }
  manageAddressList(){
    this.http.get(`${Global.url}customeraddress/`+Global.userId).subscribe(
      getData =>{
        this.manageAddress = getData.json().response;
      })
  }
  viewAA(){
    this.navCtrl.push(AddAddressPage)
  }
  viewEA(addressId){
    event.preventDefault();
    event.stopPropagation();
    Global.addId= addressId;
    this.navCtrl.push(EditAddressPage)
  }
  deleteAdd(addressId){
    this.http.delete(`${Global.url}customeraddress/`+addressId).subscribe(
      getData =>{
        //this.manageAddress = getData.json().response;
        const data1 =  getData.json()
        if (data1.status === 201) {
          const toast = this.toast.create({
            message: data1.Message,
            duration: 2000
          });
          toast.present();
          this.navCtrl.push(ManageAddressPage)
        } else if (data1.status === 400) {
          const toast = this.toast.create({
            message: data1.Message,
            duration: 2000
          });
          toast.present();
        }
      })
  }

  chnDefAddress(id_user,id_user_address){
    event.preventDefault();
    event.stopPropagation();
    const headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    this.http.patch(`${Global.url}customeraddress/addressStatus/`+id_user+"/"+id_user_address, options).subscribe(
      getData =>{
        this.manageAddress = getData.json().response;
        const data1 =  getData.json()
        if (data1.status === 200) {
          const toast = this.toast.create({
            message: data1.Message,
            duration: 2000
          });
          toast.present();
          this.manageAddressList();
        } else if (data1.status === 400) {
          const toast = this.toast.create({
            message: data1.Message,
            duration: 2000
          });
          toast.present();
        }
      })
  }
}
