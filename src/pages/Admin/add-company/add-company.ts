import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NetworkProvider } from '../../../providers/network/network';
import { Storage } from '@ionic/storage'
import { CommonProvider } from '../../../providers/common/common';
/**
 * Generated class for the AddCompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-company',
  templateUrl: 'add-company.html',
})
export class AddCompanyPage {
  data = {
    "ownerid": "", "companyname": "", "companyphone": "", "companyemailid": "",
    "companywebsite": "", "companyaddress": "", "companycity": "", "sector": "",
    "pvtpub": ""
  };

  dataResponse: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public dataProvider: NetworkProvider,
    public storage: Storage,
    public commonProvider: CommonProvider,
    public alertCtrl: AlertController) {
      

    this.getInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCompanyPage');
  }

  addCompany() {

    if (this.data.companyname.length <= 2) {
      this.commonProvider.toastMessage("Company name length is too small.")
    } else if (this.data.companyphone.length != 10) {
      this.commonProvider.toastMessage("Company Number is not valid.")
    } else if (this.data.companyemailid.length <= 6) {
      this.commonProvider.toastMessage("Company Email is not valid.")
    }
    else if (this.data.companyaddress.length <= 6) {
      this.commonProvider.toastMessage("Company Address is not valid.")
    } else if (this.data.companycity.length <= 2) {
      this.commonProvider.toastMessage("Company City is not valid.")
    } else if (this.data.companywebsite.length <= 2) {
      this.commonProvider.toastMessage("Company Website is not valid.")
    } else if (this.data.sector.length <= 2) {
      this.commonProvider.toastMessage("Company Sector is not valid.")
    } else if (this.data.pvtpub.length <= 2) {
      this.commonProvider.toastMessage("Please select pulic or private organization.")
    } else {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...',
        enableBackdropDismiss: false,
      });

      loading.present();

      this.dataProvider.addCompany(this.data).subscribe(res => {
        loading.dismiss();
        console.log(res)
        this.dataResponse = JSON.parse(res);;

        let alert = this.alertCtrl.create({
          title: 'Hello,',
          message: this.dataResponse.status_message,
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();

      }), err => {
        console.log(err);
      }
    }




  }

  getInfo() {
    this.storage.get("ownerId").then(data => {
      if (data) {
        console.log("Owner" + data)
        this.data.ownerid = data;
        
      }
    }).catch(err => {
      console.log(err);
    });

  }

}
