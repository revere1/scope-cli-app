import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SelectPackagePage } from '../select-package/select-package';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Global } from '../../Global';
import { BikeServicePage } from '../bike-service/bike-service';
import { Toast } from '@ionic-native/toast/ngx';
import * as moment from 'moment';

/**
 * Generated class for the ViewPackagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-package',
  templateUrl: 'view-package.html',
})


export class ViewPackagePage {
  data: any;
  isenabled: boolean = false;
  first: boolean = false;
  sec: boolean = false;
  third: boolean = false;
  fourth: boolean = false;
  fifth: boolean = false;
  today: boolean = false;
  package = [];
  timings: { 'value': string; }[];
  tday: any;
  tmro: any;
  ft: any;
  // 23 nov
  moment = moment;
  capacity = null;
  calander_day = false;
  slot_days = [
    {
      value: moment(),
      calander: false,
      label: 'Today'
    },
    {
      value: moment().add(1, 'days'),
      calander: false,
      label: 'Tomorrow'
    },
    {
      value: moment().add(2, 'days'),
      calander: true,
      label: 'Future'
    }
  ]
  slots = [
    {
      value: '9AM-11AM',
      momentObj: moment("09:00 AM", "LT"),
      label: '9AM to 11AM'
    },
    {
      value: '11AM-1PM',
      momentObj: moment("11:00 AM", "LT"),
      label: '11AM-1PM'
    },
    {
      value: '1PM-3PM',
      momentObj: moment("01:00 PM", "LT"),
      label: '1PM-3PM'
    },
    {
      value: '3PM-5PM',
      momentObj: moment("03:00 PM", "LT"),
      label: '3PM-5PM'
    },
    {
      value: '5PM-7PM',
      momentObj: moment("05:00 PM", "LT"),
      label: '5PM-7PM'
    }
  ]
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    private toast: ToastController) {
    this.first = true,
      this.enableTimes(this.slots, moment());
    this.enableDays(this.slot_days, moment("05:00 PM", "LT"));

    var currentdate = new Date();
    var datetime = "Now: " + currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();
    console.log(datetime);
    this.timings = [{ 'value': '10to12' }]
    console.log("timmings" + JSON.stringify(this.timings))
    console.log("timmings" + JSON.stringify(datetime))

    if (currentdate.getHours() >= 9) {
      // console.log("first")
      this.first = true;
      this.sec = false;
      this.third = false;
      this.fourth = false;
      this.fifth = false;
    }
    if (currentdate.getHours() >= 11) {
      console.log("sec")
      this.first = true;
      this.sec = true;
      this.third = false;
      this.fourth = false;
      this.fifth = false;
    }
    if (currentdate.getHours() >= 13) {
      //alert("third")
      this.first = true;
      this.sec = true;
      this.third = true;
      this.fourth = false;

      this.fifth = false;

    }
    if (currentdate.getHours() >= 15) {

      //alert("fourth")
      this.first = true;
      this.sec = true;
      this.third = true;
      this.fourth = true;
      this.fifth = false;

    }
    if (currentdate.getHours() >= 17) {
      // alert("fifth")

      this.first = true;
      this.sec = true;
      this.third = true;
      this.fourth = true;
      this.fifth = true;

    }
    if (currentdate.getHours() >= 17) {
      this.today = true;


    }

  }

  time1(a) {
    alert(a)
  }
  time2(a) {
    alert(a)
  }
  time3(a) {
    alert(a)
  }
  time4(a) {
    alert(a)
  }
  time5(a) {
    alert(a)
  }
  today1() {

  }

  tommr() {

  }
  future(d) {
    this.first = false;
    this.sec = false;
    this.third = false;
    this.fourth = false;
    this.fifth = false;
    this.ft = d
  }

  tDay(td) {
    alert(td)
    this.tday = td;
  }
  tMro(td) {
    alert(this.tmro)
    this.first = false;
    this.sec = false;
    this.third = false;
    this.fourth = false;
    this.fifth = false;
    this.tmro = td;
    alert(this.tmro)
  }


  viewP(a, b, c) {
    // if (!a) {
    //   const toast = this.toast.create({
    //     message: 'Please Enter Capcity',
    //     duration: 1000
    //   });
    //   toast.present();
    // } else if (!b) {
    //   const toast = this.toast.create({
    //     message: 'Please Enter Service Day',
    //     duration: 1000
    //   });
    //   toast.present();
    // }
    if (this.tday == 'Today') {
      alert('hi')
      b = new Date().toISOString().slice(0, 10);
    }
    if (this.tmro == 'Tomorrow') {
      b = new Date();
      b = new Date(b.getTime() + (1000 * 60 * 60 * 24));
      b = b.toISOString().slice(0, 10);
    }

    // if (this.t)
    // if (!c) {
    //   const toast = this.toast.create({
    //     message: 'Please Enter Service Slot',
    //     duration: 1000
    //   });
    //   toast.present();
    // }
    //  else
    this.navCtrl.push(SelectPackagePage, { sName: a, dSlot: b, tSlot: c })
  }

  choosePkg() {

    let cc = this.capacity
    let day = this.slot_days.filter(item => item['selected'])[0];
    let time = this.slots.filter(item => item['selected'])[0];
    if (!day) day = this.calander_day && { calander: true, label: "", value: moment(`${this.calander_day['year']}-${this.calander_day['month']}-${this.calander_day['day']}`, "YYYY-MM-DD") }
    console.log({ cc, day, time })
    if (!cc || !day || !time) {
      const toast = this.toast.create({
        message: "Select capacity, day and time!",
        duration: 4000
      });
      toast.present();
      return false;
    }

    this.navCtrl.push(SelectPackagePage, { sName: cc, dSlot: day.value ? day.value.format("YYYY-MM-DD 00:00:00") : "nothing", tSlot: time.value })
  }


  enableTimes(slots, momentTime) {
    let temp = slots.map((item) => {
      item.selected = false;
      if (item.momentObj.isSame(momentTime, 'day'))
        item.disable = item.momentObj.isBefore(momentTime)
      else item.disable = item.momentObj.isAfter(momentTime);

      return { ...item }
    });
    console.log(temp)
    this.slots = [...temp]
  }

  enableDays(days, moment) {
    days.map((item) => {
      if (item.value && item.value.isSame(moment, 'day'))
        item.disable = item.value.isAfter(moment, "hour")
    })
  }

  dateChange(date) {
   
    alert(JSON.stringify(date));
    this.calander_day = date;
    this.enableTimes(this.slots, date);
    
  }


  daySelect(list, selected, type?) {
    list.map((item) => {
      if (item.value == selected.value) item.selected = true;
      else item.selected = false
    })
    if (type) {
      this.enableTimes(this.slots, selected.value);
    }

  }










}
