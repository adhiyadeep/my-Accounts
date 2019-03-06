import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { LoginPage } from '../login/login';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl: AlertController,
       public storage : Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }


  logout() {
    let confirm = this.alertCtrl.create({
      title: 'Logout',
      message: 'Are you sure do you want to Logout?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
             this.storage.clear();
            this.navCtrl.push(LoginPage);

          }
        }
      ]
    });
    confirm.present();
  }

  changePass() {
    this.navCtrl.push('ChangePasswordPage');
  }

}
