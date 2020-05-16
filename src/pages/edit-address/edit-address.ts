import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Global } from '../../Global';
import { ManageAddressPage } from '../manage-address/manage-address';

/**
 * Generated class for the EditAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-address',
  templateUrl: 'edit-address.html',
})
export class EditAddressPage { 
  editAddressForm:FormGroup;
  editAddressFormData:any;
  addresses: any;
  mobile: number;
  userId: any;
  addId: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private http: Http
  ) { 

  this.editAddressForm = this.formBuilder.group({
    full_name: ['',[Validators.required,Validators.pattern('[a-z]|[A-Z]|[0-9]|[ ]|[-]|[_][.]*'),Validators.minLength(6), Validators.maxLength(30)]],      
    full_address : ['',[Validators.required,Validators.pattern('[a-z]|[A-Z]|[0-9]|[ ]|[-]|[_][.]*'),Validators.minLength(6), Validators.maxLength(150)]],
    city: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(20)]],
    pincode: ['',[Validators.required,Validators.minLength(5), Validators.maxLength(6)]],
  });
}
  ngOnInit() {
    this.userId=Global.userId;
    // console.log("This is userId: "+JSON.stringify(this.addId))    
    this.http.get(`${Global.url}customeraddress/`+this.userId+"/"+Global.addId).subscribe(
      getData => {
        //this.addresses = getData.json().response;
        this.editAddressFormData = getData.json().response;         
        // console.log("this is Data:>>>" + JSON.stringify(this.editAddressFormData))        
        this.editAddressFormData = getData.json().response[0];      
        this.editAddressForm = this.formBuilder.group({
          full_name: [this.editAddressFormData.full_name, [Validators.required, Validators.pattern('[a-z]|[A-Z]|[0-9]|[ ]|[-]|[_][.]*'),Validators.minLength(6), Validators.maxLength(30)]],
          full_address: [this.editAddressFormData.full_address, [Validators.required,Validators.pattern('[a-z]|[A-Z]|[0-9]|[ ]|[-]|[_][.]*'),Validators.minLength(6), Validators.maxLength(150)]],
          city: [this.editAddressFormData.city, [Validators.required,Validators.minLength(6), Validators.maxLength(20)]],
          pincode: [this.editAddressFormData.pincode, [Validators.required,Validators.minLength(5), Validators.maxLength(6)]],
        })
      })
  }

  update() {
    let obj = {
      "full_name": "" + this.editAddressForm.value.full_name,
      "full_address": "" + this.editAddressForm.value.full_address,
      "city": "" + this.editAddressForm.value.city,
      "pincode": "" + this.editAddressForm.value.pincode,
    }
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    // console.log("This is parameter: " + JSON.stringify(obj))
    this.http.put(`${Global.url}customeraddress/`+ Global.addId + '/'+this.userId,JSON.stringify(obj), options)
      .subscribe(data => {
        const data1 = data.json()
        // console.log("This is Result: " + JSON.stringify(data1));
        this.navCtrl.push(ManageAddressPage)
      }, (err) => {
        alert(err)
      })

  }

}
