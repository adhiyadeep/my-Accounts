import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import {Storage} from '@ionic/storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  role : any;
  status : any;
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public storage : Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
     // used for an example of ngFor and navigation
     this.pages = [
      { title: 'Home', component: 'AdminDashboardPage' },
      { title: 'Reports', component: 'ReportsPage' },
      { title: 'Companies', component: 'CompanysPage' },
      { title: 'Employees', component: 'EmployeesPage' },
      { title: 'Change Password', component: 'ChangePasswordPage' },

      
      
    ];
        
    });
  }

  logout()
  {

  }

  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}


