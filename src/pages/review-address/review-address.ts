import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ToastController,
  App,
  Nav,
  ViewController
} from "ionic-angular";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Global } from "../../Global";
import { MyOrderPage } from "../my-order/my-order";
import { TabsPage } from "../tabs/tabs";
import { HomePage } from "../home/home";

/**
 * Generated class for the ReviewAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-review-address",
  templateUrl: "review-address.html"
})
export class ReviewAddressPage {
  private editAddressForm: FormGroup;
  result: any;
  profile = [];
  mobile: number;
  data: any;
  package = [];
  serviceName: any;
  daySlot: any;
  timeSlot: any;
  userId: any;
  addId: any;
  Rupees: any;
  editAddressFormData: any;
  constructor(
    public alertCtrl: AlertController,
    public http: Http,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    private toast: ToastController,
    private appCtrl: App,
    private nav: NavController,
    private viewCtrl: ViewController
  ) {
    this.serviceName = this.navParams.get("serName");
    this.daySlot = this.navParams.get("dSlot");
    this.timeSlot = this.navParams.get("tSlot");
    Global.Rupees = this.navParams.get("cost");

    this.editAddressForm = this.formBuilder.group({
      full_name: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z]|[A-Z]|[0-9]|[ ]|[-]|[_][.]*"),
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],
      full_address: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z]|[A-Z]|[0-9]|[ ]|[-]|[_][.]*"),
          Validators.minLength(6),
          Validators.maxLength(150)
        ]
      ],
      city: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
      ],
      pincode: [
        "",
        [Validators.required, Validators.minLength(5), Validators.maxLength(6)]
      ]
    });
  }

  async ngOnInit() {
    // this.userId = localStorage.getItem('userId');
    await this.viewAddress(Global.userId, Global.addId);
    await this.getProfileData();
  }

  async ionViewWillEnter() {
    //calling an API
    await this.viewAddress(Global.userId, Global.addId);
    await this.getProfileData();
  }
  async getProfileData() {
    const x = localStorage.getItem("mobile");
    const mno = Number(x);
    await this.http
      .get(Global.url + "customer/myProfile/" + mno)
      .subscribe(getData => {
        this.data = getData.json().response;
        localStorage.setItem("id", JSON.stringify(this.data.id_user));
        this.package.push(this.data);
      });
  }
  async viewAddress(a, b) {
    await this.http
      .get(`${Global.url}customeraddress/` + a + "/" + b)
      .subscribe(getData => {
        this.editAddressFormData = getData.json().response[0];
        this.editAddressForm = this.formBuilder.group({
          full_name: [
            this.data.full_name,
            [
              Validators.required,
              Validators.pattern("[a-z]|[A-Z]|[0-9]|[ ]|[-]|[_][.]*"),
              Validators.minLength(6),
              Validators.maxLength(30)
            ]
          ],
          full_address: [
            this.editAddressFormData.full_address,
            [
              Validators.required,
              Validators.pattern("[a-z]|[A-Z]|[0-9]|[ ]|[-]|[_][.]*"),
              Validators.minLength(6),
              Validators.maxLength(150)
            ]
          ],
          city: [
            this.editAddressFormData.city,
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(20)
            ]
          ],
          pincode: [
            this.editAddressFormData.pincode,
            [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(6)
            ]
          ]
        });
      });
  }

  confirmIn() {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers });
    let obj = {
      id_user: this.data.id_user,
      user_mobile_number: this.data.mobile_number,
      payment: false,
      user_emailid: this.data.email,
      service_name: this.serviceName,
      day_slot: this.daySlot,
      time_slot: this.timeSlot,
      status: "Active"
    };
    this.http.post(Global.url + "customerbookings/", obj, options).subscribe(
      data => {
        const data1 = data.json();
        if (data1.status === 201) {
          const toast = this.toast.create({
            message: data1.Message,
            duration: 2000
          });
          toast.present();
          this.nav.setRoot(TabsPage);
          let obj = {
            full_name: "" + this.editAddressForm.value.full_name,
            full_address: "" + this.editAddressForm.value.full_address,
            city: "" + this.editAddressForm.value.city,
            pincode: "" + this.editAddressForm.value.pincode,
            id_user: this.editAddressFormData.id_user,
            status: "Active"
          };
          this.http
            .post(`${Global.url}customeraddress` + "/" + "create", obj)
            .subscribe(
              data => {
                this.result = JSON.parse(data["_body"]);
                if (this.result.status === 201) {
                  const toast = this.toast.create({
                    message: this.result.Message,
                    duration: 2000
                  });
                  toast.present();
                }
                this.nav.setRoot(TabsPage);
                // this.nav.pop();
              },
              err => {
                const toast = this.toast.create({
                  message: "Something went wrong ,Please try again!",
                  duration: 2000
                });
                toast.present();
              }
            );
        } else {
          const toast = this.toast.create({
            message: data1.Message,
            duration: 2000
          });
          toast.present();
        }
      },
      err => {
        const toast = this.toast.create({
          message: "Network Error",
          duration: 2000
        });
        toast.present();
      }
    );
  }
  newAcoount() {
    //this.navCtrl.setRoot('SignupPage')
  }

  closeModal() {
    this.nav.pop();
  }
}
