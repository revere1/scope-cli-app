import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { IonicApp, IonicModule } from "ionic-angular";
import { Toast } from "@ionic-native/toast/ngx";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";
import { MyOrderPage } from "../pages/my-order/my-order";
import { MyorderDetailsPage } from "../pages/myorder-details/myorder-details";
import { LocationPage } from "../pages/location/location";
import { TabsPage } from "../pages/tabs/tabs";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http'
import { Connectivity } from "../providers/connectivity-service/connectivity-service";
import { SpinnerProvider } from "../providers/spinnerProvider";
import { GoogleMaps } from "../providers/google-maps";
import { GeocodingService } from "../providers/geocode.service";
import { Network } from "@ionic-native/network";
import { Geolocation } from "@ionic-native/geolocation";
import { BikeServicePage } from "../pages/bike-service/bike-service";
import { ViewPackagePage } from "../pages/view-package/view-package";
import { SelectPackagePage } from "../pages/select-package/select-package";
import { BookNowPage } from "../pages/book-now/book-now";
import { LoginPage } from "../pages/login/login";
import { OtpPage } from "../pages/otp/otp";
import { MyprofilePage } from "../pages/myprofile/myprofile";
import { EditProfilePage } from "../pages/edit-profile/edit-profile";
import { ManageAddressPage } from "../pages/manage-address/manage-address";
import { ReviewAddressPage } from "../pages/review-address/review-address";
import { AddAddressPage } from "../pages/add-address/add-address";
import { EditAddressPage } from "../pages/edit-address/edit-address";

// import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';
// import {MatDatepickerModule} from 'angular-material';

// import { CalendarModule } from 'ion2-calendar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MyOrderPage,
    TabsPage,
    LocationPage,
    BikeServicePage,
    ViewPackagePage,
    SelectPackagePage,
    BookNowPage,
    LoginPage,
    MyprofilePage,
    EditProfilePage,
    ManageAddressPage,
    AddAddressPage,
    EditAddressPage,
    ReviewAddressPage,
    MyorderDetailsPage,
    OtpPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp)
    // CalendarModule
    // MatDatepickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MyOrderPage,
    TabsPage,
    LocationPage,
    BikeServicePage,
    ViewPackagePage,
    SelectPackagePage,
    BookNowPage,
    LoginPage,
    EditProfilePage,
    ManageAddressPage,
    MyprofilePage,
    ReviewAddressPage,
    AddAddressPage,
    EditAddressPage,
    MyorderDetailsPage,
    OtpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ReactiveFormsModule,
    FormsModule,
    Geolocation,
    Network,
    Toast,
    // SecureStorage,
    Connectivity,
    SpinnerProvider,
    GoogleMaps,
    GeocodingService
  ]
})
export class AppModule {}
