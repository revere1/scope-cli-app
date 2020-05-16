import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";

import { TabsPage } from "../pages/tabs/tabs";
import { LoginPage } from "../pages/login/login";
import { ViewPackagePage } from "../pages/view-package/view-package";

// import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // rootPage: any = LoginPage;
  rootPage: any = TabsPage;

  pages: Array<{ title: string; component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen // public secureStorage: SecureStorage
  ) {
    // {
    //   Global.userId = localStorage.getItem('id_user');
    //   if(Global.userId !== null){
    //     this.rootPage = TabsPage;
    //   } else {
    //     this.rootPage = LoginPage;
    //   }
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Home", component: HomePage },
      { title: "List", component: ListPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.nativeStorage.getItem('myitem')
      //   .then(
      //     () => console.log('Stored item!', JSON.stringify('myitem')),
      //     error => console.error('Error storing item', error)
      //   );
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
