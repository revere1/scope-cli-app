import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ToastController
} from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Global } from "../../Global";
import { ReviewAddressPage } from "../review-address/review-address";
import { TabsPage } from "../tabs/tabs";
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-edit-profile",
  templateUrl: "edit-profile.html"
})
export class EditProfilePage {
  editProfileForm: FormGroup;
  editProfileFormData: any;
  serviceName: any;
  daySlot: any;
  timeSlot: any;
  mobile: number;
  profile = [];
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    private http: Http,
    private alertCtrl: AlertController,
    private toast: ToastController
  ) {
    this.serviceName = this.navParams.get("serName");
    this.daySlot = this.navParams.get("dSlot");
    this.timeSlot = this.navParams.get("tSlot");
    this.editProfileForm = this.formBuilder.group({
      full_name: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z]|[A-Z]|[0-9]|[ ]|[-]|[_][.]*"),
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],
      email: ["", [Validators.email]],
      mobile_number: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(12)
        ]
      ]
      // dob: ['',[Validators.required]],
      // gender: [[Validators.required]]
    });
  }
  ngOnInit() {
    var x = localStorage.getItem("mobile");
    this.mobile = Number(x);
    this.http
      .get(`${Global.url}customer/myProfile/` + this.mobile)
      .subscribe(getData => {
        this.editProfileFormData = getData.json().response;
        this.editProfileForm = this.formBuilder.group({
          full_name: [
            this.editProfileFormData.full_name,
            [
              Validators.required,
              Validators.pattern("[a-z]|[A-Z]|[0-9]|[ ]|[-]|[_][.]*"),
              Validators.minLength(6),
              Validators.maxLength(30)
            ]
          ],
          email: [this.editProfileFormData.email, [Validators.email]],
          mobile_number: [
            this.editProfileFormData.mobile_number,
            [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(12)
            ]
          ]
          // dob: [this.editProfileFormData.dob, [Validators.required]],
          // gender: [this.editProfileFormData.gender, [Validators.required]],
        });
      });
  }

  submit() {
    let obj = {
      full_name: "" + this.editProfileForm.value.full_name,
      email: "" + this.editProfileForm.value.email,
      mobile_number: "" + this.editProfileForm.value.mobile_number,
      dob: "" + this.editProfileForm.value.dob
      // "gender":""+ this.editProfileForm.value.gender
    };
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers });
    this.http
      .put(
        Global.url +
          "customer/updateProfile/" +
          this.editProfileFormData.id_user,
        JSON.stringify(obj),
        options
      )
      .subscribe(
        data => {
          const data1 = data.json();
          if (data1.status === 200) {
            const toast = this.toast.create({
              message: data1.Message,
              duration: 2000
            });
            toast.present();
            this.navCtrl.setRoot(ReviewAddressPage, {
              userId: this.editProfileFormData.id_user,
              serName: this.serviceName,
              dSlot: this.daySlot,
              tSlot: this.timeSlot
            });
          } else if (data1.status === 400) {
            const toast = this.toast.create({
              message: data1.Message,
              duration: 2000
            });
            toast.present();
          }
        },
        err => {
          alert(err);
        }
      );
  }
}
