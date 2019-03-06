import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from 'ionic-angular';

/*
  Generated class for the CommonProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {

  constructor(public http: HttpClient, public toastCtrl : ToastController
   ) {
    console.log('Hello CommonProvider Provider');
  }


  toastMessage(message)
  {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}