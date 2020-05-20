import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Global } from '../../Global';
import { OtpPage } from '../otp/otp';
// import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
// import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private signInForm: FormGroup;
  result: any;
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public http: Http,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    private toast: ToastController,
    // private secureStorage: SecureStorage
  ) {
    this.signInForm = this.formBuilder.group({   
      mobile_number: ['91', [Validators.required,Validators.minLength(10), Validators.maxLength(12)]],
    });
  }
  signIn() {
    localStorage.setItem('mobile', JSON.parse(this.signInForm.get('mobile_number').value))
    this.http.get(`${Global.url}customer/login/` + this.signInForm.get('mobile_number').value)
      .subscribe(data => {
        const result = data.json()
        if (result.status === 200) {
          if (result.Messages === undefined) {
            // const toast = this.toast.create({
            //   message: `This is OTP:${result.Messages}`,
            //   duration: 2000
            // });
            // toast.present();
          } else {
            const toast = this.toast.create({
              message: `This is OTP:${result.Messages}`,
              duration: 2000
            });
            toast.present();
            localStorage.setItem('otp', JSON.stringify(result.Messages))
            this.navCtrl.setRoot(OtpPage);
          }
        } else if (result.status === 400) {
          const toast = this.toast.create({
            message: result.Message,
            duration: 2000
          });
          toast.present();
        }
      },
        err => {
          const alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: 'Something went wrong ,Please try again!',
            buttons: ['OK']
          });
          alert.present();
        }
      );
  }
  
}
