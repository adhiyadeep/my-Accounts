import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NetworkProvider } from '../../../providers/network/network';
import { Storage } from '@ionic/storage'
import { CommonProvider } from '../../../providers/common/common';

/**
 * Generated class for the AddEmployeesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-employees',
  templateUrl: 'add-employees.html',
})
export class AddEmployeesPage {
  companiesList: any;
  cmpyData = { "ownerid": "46" };
  data = { "ownerid": "46", "name": "", "companyname": "", "phone": "", "emailid": "", "editreport": "" };
  response: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: NetworkProvider,
    public storage: Storage,
    public commonProvider: CommonProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

      this.getInfo()
    this.data.editreport = "No";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEmployeesPage');
  }

  addEmployees() {
    if (this.data.name.length <= 3) {
      this.commonProvider.toastMessage("Enter Valid Name");
    } else if (this.data.emailid.length <= 6) {
      this.commonProvider.toastMessage("Enter Valid Email");
    } else if (this.data.phone.length != 10) {
      this.commonProvider.toastMessage("Enter Valid Mobile No");
    } else {

      let loading = this.loadingCtrl.create({
        content: 'Please wait...',
        enableBackdropDismiss: false,
      });

      loading.present();

      this.dataService.addEmployees(this.data).subscribe(res => {
        loading.dismiss();
        console.log("Data " + res);
        this.response = JSON.parse(res);

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

        //  this.recipiesData = data.filter(data =>  data.type == "Adult"); 
      });
    }
  }


  getCompanies() {
    this.dataService.getCompaniesList(this.cmpyData).subscribe(res => {
      console.clear();
      console.log("Company List" + res)
      this.companiesList = JSON.parse(res);



      //  this.recipiesData = data.filter(data =>  data.type == "Adult"); 
    }, err => {
      console.log(err)
    });
  }


  getInfo() {
    this.storage.get("ownerId").then(data => {
      if (data) {
        
       this.data.ownerid = data;
       console.log("ID is"+data);
       this.getCompanies();
       
      }
    }).catch(err => {
      console.log(err);
    });

   
  }

  selectCompany(value) {
    this.data.companyname = value;
  }

  editReport(value) {
    console.log(value.checked);
    if (value.checked == false) {
      this.data.editreport = "No";
    } else {
      this.data.editreport = "Yes";
    }
  }


}
