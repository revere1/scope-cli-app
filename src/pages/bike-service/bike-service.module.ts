import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BikeServicePage } from './bike-service';

@NgModule({
  declarations: [
    BikeServicePage,
  ],
  imports: [
    IonicPageModule.forChild(BikeServicePage),
  ],
})
export class BikeServicePageModule {}
