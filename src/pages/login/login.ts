import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network/network';
import { CommonProvider } from '../../providers/common/common';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginData = { "emailid": "", "password": "" };
  dataResponse: any;
  status: any;
  role: any;
  forgotData = { "emailid": "" };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: NetworkProvider,
    public commonProvider: CommonProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public storage: Storage, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    this.getInfo()

  }


  getInfo() {
    this.storage.get("role").then(data => {
      if (data) {
        console.log("Role", data);
        this.role = data;
      }
    }).catch(err => {
      console.log(err);
    });
    this.storage.get("discard").then(data => {
      if (data) {

        console.log("Discard", data);
        this.status = data;

        this.getNavigation();
      }
    }).catch(err => {
      console.log(err);
    });


  }

  getNavigation() {

    console.log("ehy")
    if (this.role === "Employee" && this.status === "No") {
      this.navCtrl.push('EmployeeDashboardPage')

    } else if (this.role === "Admin" && this.status === "No") {
      this.navCtrl.push('AdminDashboardPage')
    } else {


    }
  }


  login() {
    if (this.loginData.emailid == "" && this.loginData.password == "") {
      this.commonProvider.toastMessage("Please Enter Email and Password");
    }
    else if (this.loginData.emailid == "") {
      this.commonProvider.toastMessage("Please Enter Email ");
    }
    else if (this.loginData.password.length <= 2) {
      this.commonProvider.toastMessage("Please Enter Password ");
    }
    else {

      let loading = this.loadingCtrl.create({
        content: 'Please wait...',
        enableBackdropDismiss: false,
      });

      loading.present();

      this.dataProvider.authenticate(this.loginData).subscribe(res => {
        loading.dismiss();
        this.dataResponse = JSON.parse(res);

        if (this.dataResponse.sta == "1") {
          this.storage.set("id", this.dataResponse.id);
          this.storage.set("ownerId", this.dataResponse.ownerId);
          this.storage.set("name", this.dataResponse.name);
          this.storage.set("phone", this.dataResponse.phone);
          this.storage.set("emaidId", this.dataResponse.emaidId);
          this.storage.set("companyName", this.dataResponse.companyName);
          this.storage.set("role", this.dataResponse.role);
          this.storage.set("discard", this.dataResponse.discard);
          this.storage.set("DateTime", this.dataResponse.DateTime);
          this.storage.set("editReport", this.dataResponse.editReport);

          if (this.dataResponse.discard = "No") {
            if (this.dataResponse.role == "Employee") {
              this.navCtrl.push('EmployeeDashboardPage')
            } else if (this.dataResponse.role == "Admin") {
              this.navCtrl.push('AdminDashboardPage')
            }
          }


        } else {
          this.commonProvider.toastMessage(this.dataResponse.status_message);
        }



      }), err => {
        console.log(err);
      }
    }
  }


  forgotPass() {

    let alert = this.alertCtrl.create({
      title: 'Forgot Password',
      inputs: [
        {
          name: 'Email',
          placeholder: 'Email Id'
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.forgotData.emailid = data.Email;
            console.log(this.forgotData.emailid);
            if (data.Email.length <= 5) {
              let toast = this.toastCtrl.create({
                message: 'Please Enter Valid Email',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
              this.forgotPass();
            }
            else {

              

              this.dataProvider.forgotPass(this.forgotData).subscribe(response => {
                console.log("Response" + response);

                var msg = JSON.parse(response).status_message;;
                let alert = this.alertCtrl.create({
                  title: "Hello",
                  subTitle: msg,
                  buttons: ['Ok']
                });
                alert.present();
              });

            }
          }
        }
      ]
    });
    alert.present();
  }


}
