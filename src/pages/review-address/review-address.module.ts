import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewAddressPage } from './review-address';

@NgModule({
  declarations: [
    ReviewAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewAddressPage),
  ],
})
export class ReviewAddressPageModule {}
