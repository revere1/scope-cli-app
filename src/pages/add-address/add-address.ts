import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http, RequestOptions, Headers} from '@angular/http';
import {Global}  from '../../Global';
import { ManageAddressPage } from '../manage-address/manage-address';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the AddAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html',
})
export class AddAddressPage {
  addForm: FormGroup;
   profile=[];
   userId: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private http: Http,
    private toast: ToastController
    ) {
      this.addForm = this.formBuilder.group({
        full_name: ['',[Validators.required,Validators.pattern('[a-z]|[A-Z]|[0-9]|[ ]|[-]|[_][.]*'),Validators.minLength(6), Validators.maxLength(30)]],      
        full_address : ['',[Validators.required,Validators.pattern('[a-z]|[A-Z]|[0-9]|[ ]|[-]|[_][.]*'),Validators.minLength(6), Validators.maxLength(150)]],
        city: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(20)]],
        pincode: ['',[Validators.required,Validators.minLength(5), Validators.maxLength(6)]],
      });
      this.userId =Global.userId;
    }

    addAddress(){
    const headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let obj = {
      full_name:this.addForm.value.full_name,
      full_address:this.addForm.value.full_address,
      city:this.addForm.value.city,
      pincode:this.addForm.value.pincode,
      id_user:this.userId,
      status:"Active" 
    }
    // console.log("this is edit Profile: "+JSON.stringify(obj))
    this.http.post(Global.url+'customeraddress/create',JSON.stringify(obj), options)
    .subscribe(data => {
      const data1 =  data.json()
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
    },(err) =>{
      alert(err)
    })
  }
  }

