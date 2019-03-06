import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { NetworkProvider } from '../../providers/network/network';
import { LoginPage } from '../login/login';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  pass = {"password" : "" , "emailid" : "", "c_pass" : ""};
  passResp : any;
  password_type: string = 'password';
  passwordview: boolean;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public common : CommonProvider,
    public dataProvider : NetworkProvider,
    public alertCtrl : AlertController,
    public storage : Storage,
    public platform : Platform) {

      platform.registerBackButtonAction(() => {
        if (navCtrl.canGoBack()) {
          navCtrl.pop();
        } else {
          navCtrl.pop();
        }
      });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');

    this.getInfo()
  }
  


  UpdatePass()
  {

    if( this.pass.password !=this.pass.c_pass )
    {
      this.common.toastMessage("Password Mismatch!");
    }
    else if(this.pass.password.length <=5)
    {
      this.common.toastMessage("Password must be minimum 6 character");
    }
    else 
    {
      this.dataProvider.updatePass(this.pass).subscribe (res => {
        console.log(res);
        this.passResp = JSON.parse(res);
  
          let alert = this.alertCtrl.create({
          title: 'Success',
          message: 'Password Updated, Please Login Again!',
          enableBackdropDismiss : false,
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.storage.clear();  
                this.navCtrl.push(LoginPage);
              }
            }
          ]
        });
        alert.present();
      
      }, err => {
        console.log(err);
      })
    }
   
  }


  getInfo()
  {
    this.storage.get("emaidId").then(data => {
      if (data) {
        this.pass.emailid = data;
      
      }
    }).catch(err => {
      console.log(err);
    });
  }


  togglePasswordMode() {
    if (this.passwordview) {
      this.password_type = this.password_type === 'text' ? 'changepass.password' : 'text';
    }
    else {
      this.password_type = this.password_type === 'password' ? 'changepass.password' : 'password';
      
    }
  }

}
