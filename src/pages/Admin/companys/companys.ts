import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NetworkProvider } from '../../../providers/network/network';
import { Storage } from '@ionic/storage'

/**
 * Generated class for the CompanysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-companys',
  templateUrl: 'companys.html',
})
export class CompanysPage {
  companies: any;
  data = { "ownerid": "" };
  companiesList: any;
  company : any;
  chnageStatus = { "id": "", "discard": "" };

  length: any;
  noData: boolean = false;
  message: any;

  actCompanies : any;
  deactCompanies : any;
  statusResponse : any;

  activeStatus: boolean = false;
  deactiveStatus: boolean = false

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: NetworkProvider,
    public storage: Storage,
    public alertCtrl : AlertController) {
      this.company ="active";

      this.activeStatus = true;
      this.deactiveStatus = false;
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanysPage');
    this.getInfo();
  }

  ionViewDidEnter() {

  }
  segmentChanged(company) {
    console.log(company)

    if (company == "active") {
      this.companiesList = this.actCompanies.filter(res => res.discard == "No");
      console.log("Active" + this.companiesList)
      this.length = this.companiesList.length;
      if (this.length == "0") {
        this.noData = true;
        this.message = "No Active Companies."
      } else {
        this.noData = false;
      }

    } else {
      this.companiesList = this.deactCompanies.filter(res => res.discard == "Yes");

      this.length = this.companiesList.length;
      if (this.length == "0") {
        this.noData = true;
        this.message = "No Deactivated Companies."
      } else {
        this.noData = false;
      }
    }
    
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

  changeStatus(id,status)
  {
    let alert = this.alertCtrl.create({
      title: 'Hello,',
      message: "Do you want to Activate/Deactivate Employee?",
      buttons: [
        {
          text: 'No',
          handler: () => {
           
          }
        },
        {
          text: "Ok",
          handler: () => {
            this.chnageStatus.id = id;
            this.chnageStatus.discard = status;
            this.dataService.compStatusChange(this.chnageStatus).subscribe(res => {

              this.statusResponse = JSON.parse(res);

              let alert = this.alertCtrl.create({
                title: 'Hello,',
                message: this.statusResponse.status_message,
                buttons: [
                  {
                    text: 'Ok',
                    handler: () => {
                      this.getCompanies()
                    }
                  }
                ]
              });
              alert.present();


            }, err => {
              console.log(err);
            });
          }
        }
      ]
    });
    alert.present();

  }

  addCompany()
  {
    this.navCtrl.push('AddCompanyPage');
  }

  getCompanies() {
    this.dataService.getCompaniesList(this.data).subscribe(res => {
      console.log("Data " + res);
      this.companiesList = JSON.parse(res);
      this.actCompanies = JSON.parse(res);
      this.deactCompanies = JSON.parse(res);
      this.length = this.companiesList.length;

      


      if (this.length == "0") {
        this.noData = true;
        this.message = "No Companies Added."
      } else {
        this.noData = false;
      }

      this.companiesList = this.actCompanies.filter(res => res.discard == "No");
      
    }, err=>{
      console.log(err)
    });
  }

}
