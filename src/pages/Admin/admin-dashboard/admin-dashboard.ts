import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Platform, AlertController } from 'ionic-angular';
import { NetworkProvider } from '../../../providers/network/network';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the AdminDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-dashboard',
  templateUrl: 'admin-dashboard.html',
})
export class AdminDashboardPage {
  countData ={"ownerid" : ""}
  getOnwerId = {"phone" : ""}
  count : any;
  empCount : any;
  companyCount : any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public dataService : NetworkProvider,
     public storage : Storage,
     public popoverCtrl : PopoverController,
     public platform: Platform,
     public alertCtrl : AlertController
     ) {

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
    console.log('ionViewDidLoad AdminDashboardPage');

    this.getInfo()
  }


  getCount()
  {
    this.dataService.getDashboardCount(this.countData).subscribe(res => {
      console.clear();
      console.log("Company List" + res)
      this.count = JSON.parse(res);

      this.empCount = this.count.employee;
      this.companyCount = this.count.company;

      console.log(this.empCount,this.companyCount)



      //  this.recipiesData = data.filter(data =>  data.type == "Adult"); 
    }, err => {
      console.log(err)
    });
    }

    getOwnerID()
    {
      this.dataService.getOwnerId(this.getOnwerId).subscribe(res => {
        console.clear();
        console.log(" ID" + res)
        this.countData.ownerid = JSON.parse(res).ownerID; 
        this.storage.set('ownerId',JSON.parse(res).ownerID)
        this.getCount();
      }, err => {
        console.log(err)
      });
    }


    getInfo()
    {
      this.storage.get("phone").then(data => {
        if (data) {
          this.getOnwerId.phone = data;
          this.getOwnerID();
        }
      }).catch(err => {
        console.log(err);
      });
    }


    presentPopover($myEvent) {
      let popover = this.popoverCtrl.create('PopoverPage');
      popover.present({
        ev: $myEvent
      });
    }
}
