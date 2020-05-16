import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyorderDetailsPage } from './myorder-details';

@NgModule({
  declarations: [
    MyorderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyorderDetailsPage),
  ],
})
export class MyorderDetailsPageModule {}
