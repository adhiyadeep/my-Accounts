import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NetworkProvider } from '../../../providers/network/network';
import { Storage } from '@ionic/storage';



/**
 * Generated class for the EmployeesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employees',
  templateUrl: 'employees.html',
})
export class EmployeesPage {
  data = { "ownerid": "46" };
  chnageStatus = { "id": "", "discard": "" };
  employee: any;
  companiesList: any;
  employeeList: any;
  activeEmp: any;
  deacEmp: any;
  length: any;
  noData: boolean = false;
  message: any;
  statusResponse: any;
  activeStatus: boolean = false;
  deactiveStatus: boolean = false
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: NetworkProvider,
    public storage: Storage,
    public alertCtrl: AlertController) {


    this.activeStatus = true;
    this.deactiveStatus = false;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeesPage');
  }


  ionViewWillEnter() {
    this.getInfo();
  }



  getInfo() {
    this.storage.get("ownerId").then(data => {
      if (data) {

        this.data.ownerid = data;
        console.log("ID is" + data);
        this.getEmployeeList()

      }
    }).catch(err => {
      console.log(err);
    });


  }


  getEmployeeList() {
    this.dataService.getEmployeeList(this.data).subscribe(res => {
      // console.log("Data " + res);
      this.employeeList = JSON.parse(res);

      this.length = this.employeeList.length;
      if (this.length == "0") {
        this.noData = true;
        this.message = "No Employees Added."

      } else {
        this.noData = false;
      }
      this.activeEmp = JSON.parse(res);
      this.deacEmp = JSON.parse(res);
      this.employeeList = this.activeEmp.filter(res => res.discard == "No");
      this.employee = "Active"

    }, err => {
      console.log(err);
    });
  }

  segmentChanged(val) {


    if (val == "active") {
      this.employeeList = this.activeEmp.filter(res => res.discard == "No");
      console.log("Active" + this.employeeList)
      console.log(this.employeeList)
      this.activeStatus = true;
      this.deactiveStatus = false;
      this.length = this.employeeList.length;
      if (this.length == "0") {
        this.noData = true;
        this.message = "No Active Employees."
      } else {
        this.noData = false;
      }

    } else {
      this.employeeList = this.deacEmp.filter(res => res.discard == "Yes");
      console.log("discard" + this.employeeList)

      this.activeStatus = false;
      this.deactiveStatus = true;

      this.length = this.employeeList.length;
      if (this.length == "0") {
        this.noData = true;
        this.message = "No Deactivated Employees."
      } else {
        this.noData = false;
      }
    }


  }

  addEmployee() {
    this.navCtrl.push('AddEmployeesPage')
  }

  changeStatus(id, status) {

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
            this.dataService.empStatusChange(this.chnageStatus).subscribe(res => {

              this.statusResponse = JSON.parse(res);

              let alert = this.alertCtrl.create({
                title: 'Hello,',
                message: this.statusResponse.status_message,
                buttons: [
                  {
                    text: 'Ok',
                    handler: () => {
                      this.getEmployeeList()
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


}
