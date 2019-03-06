import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Platform, AlertController } from 'ionic-angular';
import { NetworkProvider } from '../../../providers/network/network';
import { CommonProvider } from '../../../providers/common/common';
import { Storage } from '@ionic/storage'


/**
 * Generated class for the EmployeeDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employee-dashboard',
  templateUrl: 'employee-dashboard.html',
})
export class EmployeeDashboardPage {
 



  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public commonProvider: CommonProvider,
    public dataProvider: NetworkProvider,
    public popoverCtrl : PopoverController,
        public storage : Storage,
        public platform : Platform,
        public alertCtrl :AlertController) {
          platform.registerBackButtonAction(() => {
            this.presentConfirm();
          });

  }

  presentConfirm() {
    let backAction =  this.platform.registerBackButtonAction(() => {
      // omitted;
      let alert = this.alertCtrl.create({
         title: 'Exit',
        message: 'Do you really want to exit?',
        enableBackdropDismiss : false,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Ok',
            handler: () => {
              this.platform.exitApp();
            }
          }
        ]
      });
      alert.present();
      backAction();
    },1)
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeDashboardPage');


  }

  addIncome() {
      this.navCtrl.push('AddIncomePage')
  }

  addExpense() {
    this.navCtrl.push('AddExpensePage')
  }

  showReport() {
    this.navCtrl.push('ReportsPage')
  }

  presentPopover($myEvent) {
    let popover = this.popoverCtrl.create('PopoverPage');
    popover.present({
      ev: $myEvent
    });
  }


}
