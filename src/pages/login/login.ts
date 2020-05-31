import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  products:any;
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public http: HttpClient,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    private toast: ToastController,
    // private secureStorage: SecureStorage
  ) {
    this.signInForm = this.formBuilder.group({   
      mobile_number: ['91', [Validators.required,Validators.minLength(10), Validators.maxLength(12)]],
    });
  }

  getHeader(){
    let headers = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/javascript'
      })
      };
      return headers;
    }
  signIn() {
    localStorage.setItem('mobile', JSON.parse(this.signInForm.get('mobile_number').value))
    return this.http.get(`${Global.url}customer/login/` + this.signInForm.get('mobile_number').value,this.getHeader())
    .subscribe((data: any[])=>{
      console.log(data);
      this.products = data;
      console.log("LoginPage -> signIn -> products", this.products)
        if (this.products.status === 200) {
          if (this.products.Messages === undefined) {
            // const toast = this.toast.create({
            //   message: `This is OTP:${result.Messages}`,
            //   duration: 2000
            // });
            // toast.present();
          } else {
            const toast = this.toast.create({
              message: `This is OTP:${this.products.Messages}`,
              duration: 2000
            });
            toast.present();
            localStorage.setItem('otp', JSON.stringify(this.products.Messages))
            this.navCtrl.setRoot(OtpPage);
          }
        } else if (this.products.status === 400) {
          const toast = this.toast.create({
            message: this.products.Message,
            duration: 2000
          });
          toast.present();
        }
      },
        err => {
          const alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: `Something went wrong ,Please try again!${err}`,
            buttons: ['OK']
          });
          alert.present();
        }
      );
  }
  
}
