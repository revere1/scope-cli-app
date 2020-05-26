import * as moment from 'moment';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SelectPackagePage } from '../select-package/select-package';

@IonicPage()
@Component({
  selector: 'page-view-package',
  templateUrl: 'view-package.html',
})
export class ViewPackagePage {
  moment = moment;
  disabledPackageBtn=true;
  timeEnable=true;
  capacity = null;
  calander_day = false;
  slot_days = [
    {
      value: moment(),
      calander: false,
      label: 'Today',
      isSelected:false
    },
    {
      value: moment().add(1, 'days'),
      calander: false,
      label: 'Tomorrow',
      isSelected:false
    },
    {
      calander: true,
      value:moment().add(2, 'days'),
      label: 'Future',
      isSelected:false
    }
  ]
  slots = [
    {
      value: '9AM-11AM',
      time: moment("09:00 AM", "LT"),
      label: '9AM to 11AM',
      isSelected:false
    },
    {
      value: '11AM-1PM',
      time: moment("11:00 AM", "LT"),
      label: '11AM-1PM',
      isSelected:false
    },
    {
      value: '1PM-3PM',
      time: moment("01:00 PM", "LT"),
      label: '1PM-3PM',
      isSelected:false
    },
    {
      value: '3PM-5PM',
      time: moment("03:00 PM", "LT"),
      label: '3PM-5PM',
      isSelected:false
    },
    {
      value: '5PM-7PM',
      time: moment("05:00 PM", "LT"),
      label: '5PM-7PM',
      isSelected:false
    }
  ]
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    private toast: ToastController) {
    this.filterTimes(moment());
    this.enableDays(moment("05:00 PM", "LT"));
  }

  enableDays(today) {
    this.slot_days = this.slot_days.map((item) => {
      if (item.value && item.value.isSame(today, 'day')) {
        const disable = item.value.isAfter(today, "hour");
        return { ...item, disable }
      }
      return item;
    })
  }

  filterTimes(selectedDay){
    this.slots = this.slots.map((item) => {
      let disable = item.time.isAfter(selectedDay);
      if (item.time.isSame(selectedDay, 'day')) {
        disable = item.time.isBefore(selectedDay);
      }
      return { ...item, disable, isSelected: false }
    });
  }
  
  selectDay(day, selectedDate) {
    this.slot_days = this.slot_days.map((o) => {
      if (o.label === day) {
        let value = o.value;
        if(selectedDate){
          const {day, month, year} = selectedDate;
          const date = [day,month,year].join('/');
          value = moment(date,'DD/MM/YYYY');
        }
        this.filterTimes(value);
        this.timeEnable=false;
        return { ...o, value, isSelected: true };
      }
      return { ...o, isSelected: false}
    });
  }

  selectTime(selectedSlot) {
    this.slots = this.slots.map(s => {
      if (s.value === selectedSlot.value) {
        this.disabledPackageBtn = false;
        return { ...s, isSelected: true }
      }
      return { ...s, isSelected: false }
    })
  }

  choosePackage() {
    let selectedCapacity = this.capacity
    let selectedDay = this.slot_days.find(item => item.isSelected);
    console.log("ViewPackagePage -> choosePackage -> selectedDay", selectedDay)
    let selectedTime = this.slots.find(item => item.isSelected);
  
    if (!selectedCapacity || !selectedDay || !selectedTime) {
      const toast = this.toast.create({
        message: "Select capacity, day and time!",
        duration: 4000
      });
      toast.present();
      return false;
    }

    const nextObj = { sName: this.capacity, tSlot: '', dSlot: '' }
    nextObj.tSlot = selectedTime.value;
    nextObj.dSlot = selectedDay.value.format("YYYY-MM-DD 00:00:00");
    console.log("ViewPackagePage -> choosePackage -> nextObj", nextObj)
    this.navCtrl.push(SelectPackagePage, nextObj);
  }
}
