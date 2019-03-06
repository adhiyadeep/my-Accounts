import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailedSummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailed-summary',
  templateUrl: 'detailed-summary.html',
})
export class DetailedSummaryPage {

  summary: any;
  incomeData: any;
  expenseData: any;

  incomeSelected: boolean = false;
  expenseSelected: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailedSummaryPage');

    this.incomeData = this.navParams.get('incomeData');
    this.expenseData = this.navParams.get('expenseData');

    this.summary = "income"
    this.incomeSelected = true;
    this.expenseSelected = false;
  }

  segmentChanged(select) {
    if (select == "income") {
      this.incomeSelected = true;
      this.expenseSelected = false;
    } else {
      this.incomeSelected = false;
      this.expenseSelected = true;
    }
  }

}
