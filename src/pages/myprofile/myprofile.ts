import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ManageAddressPage } from '../manage-address/manage-address';
import { EditProfilePage } from '../edit-profile/edit-profile';

/**
 * Generated class for the MyprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html',
})
export class MyprofilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  viewEP(){
    this.navCtrl.push(EditProfilePage)
  }
  viewMA(){
    this.navCtrl.push(ManageAddressPage)
  }
}
