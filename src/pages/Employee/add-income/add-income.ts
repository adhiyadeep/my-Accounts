import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { CommonProvider } from '../../../providers/common/common';
import { NetworkProvider } from '../../../providers/network/network';
import { DatePipe } from '@angular/common';
/**
 * Generated class for the AddIncomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-income',
  templateUrl: 'add-income.html',
})
export class AddIncomePage {
  hideBankInfo: boolean = false;
  currentDate: any;
  response; any;

  data = {
    "date": "", "billno": "", "billdate": "", "amount": ""
    , "modeofpayment": "", "chequeno": "", "bankname": "",
    "receivedfrom": "", "purpose": "", "remarks": "",
    "companyname": "", "ownerid": ""
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public commonProvider: CommonProvider,
    public dataProvider: NetworkProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

      this.currentDate = new Date();

      this.FormatDt()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddIncomePage');

   this.getInfo() 
  }

  onPaymodeChange(value) {
    console.log(value)
    if (value == "Cheque") {
      this.hideBankInfo = true;
    } else {
      this.hideBankInfo = false;
      this.data.chequeno = "";
      this.data.bankname = "";
    }
  }

  getInfo() {
    this.storage.get("ownerId").then(data => {
      if (data) {
        this.data.ownerid = data;
      }
    }).catch(err => {
      console.log(err);
    });

    this.storage.get("companyName").then(data => {
      if (data) {
        console.log("Discard", data);
        this.data.companyname = data;
      }
    }).catch(err => {
      console.log(err);
    });

  }
  addIncomeData() {

    if (this.data.date == "") {
      this.commonProvider.toastMessage("Please Enter Date");
    }

    else if (this.data.billdate == "") {
      this.commonProvider.toastMessage("Please Enter Bill Date");
    }
    else if (this.data.amount == "") {
      this.commonProvider.toastMessage("Please Enter Amount");
    }
    else if (this.data.modeofpayment == "") {
      this.commonProvider.toastMessage("Please Select Paymode");
    }
    else if (this.data.receivedfrom == "") {
      this.commonProvider.toastMessage("Please Enter Recieved From");
    }
    else if (this.data.purpose == "") {
      this.commonProvider.toastMessage("Please Enter Purpose");
    } else {

      let loading = this.loadingCtrl.create({
        content: 'Please wait...',
        enableBackdropDismiss: false
      });

      this.data.date = new DatePipe('en-US').transform(this.currentDate, 'dd-MM-yyyy');
      console.log(this.data.date)
      this.data.billdate = new DatePipe('en-US').transform(this.data.billdate, 'dd-MM-yyyy');
      console.log(this.data.billdate)
      
      this.dataProvider.addIncome(this.data).subscribe(res => {
        loading.present();
        this.response = JSON.parse(res);

        loading.dismiss();


        let alert = this.alertCtrl.create({
          title: 'Hello,',
          message: this.response.status_message,
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
      }, err => {
        console.log(err);
      })
    }
  }

  //Bill Date
  dateChanged(value) {

    console.log(value);

  }

  //App Date
  FormatDt() {
    var DataObj = this.currentDate;     // Data obj of Date
    var year = DataObj.getFullYear().toString();
    var month = DataObj.getMonth().toString();
    var dt = DataObj.getDate().toString();

    var MonthsArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    this.data.date = dt + "-" + MonthsArray[month] + "-" + year
    console.log("print format " + this.data.date);
  }



}
