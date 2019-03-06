import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ExpenseModeWisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expense-mode-wise',
  templateUrl: 'expense-mode-wise.html',
})
export class ExpenseModeWisePage {

  expenseData: any;
  fromDt: any;
  toDt: any;

  cashFilter: any;
  chequeFilter: any;
  cCardFilter: any;
  dCardFilter: any;
  netBankingFilter: any;
  otherFilter: any;
  paytmFilter: any;
  totalFilter: any;
  othersFilter : any;


  cashTotal: number = 0;
  chequeTotal: number = 0;
  cCardTotal: number = 0;
  dCardTotal: number = 0;
  netBankingTotal : number = 0;
  othersTotal : number =0;
  paytmTotal : number = 0;
  total : number =0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpenseModeWisePage');

    this.expenseData = this.navParams.get('expenseData');
    this.fromDt = this.navParams.get('fromDt');
    this.toDt = this.navParams.get('toDt');

    this.filterData()

  }

  filterData() {
    //Cash
    this.cashFilter = this.expenseData.filter(res => res.paymentmode == "Cash")
    this.cashFilter.forEach((e: any) => {
      this.cashTotal = this.cashTotal + Number(e.amount);
    });

    //Cheque
    this.chequeFilter = this.expenseData.filter(res => res.paymentmode == "Cheque")
    this.chequeFilter.forEach((e: any) => {
      this.chequeTotal = this.chequeTotal + Number(e.amount);
    });

    //Credit Card
    this.cCardFilter = this.expenseData.filter(res => res.paymentmode == "Credit Card")
    this.cCardFilter.forEach((e: any) => {
      this.cCardTotal = this.cCardTotal + Number(e.amount);
    });

    //Debit Card
    this.dCardFilter = this.expenseData.filter(res => res.paymentmode == "Debit Card")
    this.dCardFilter.forEach((e: any) => {
      this.dCardTotal = this.dCardTotal + Number(e.amount);
    });

    //Net Banking
    this.netBankingFilter = this.expenseData.filter(res => res.paymentmode == "Net Banking")
    this.netBankingFilter.forEach((e: any) => {
      this.netBankingTotal = this.netBankingTotal + Number(e.amount);
    });

    //Others
    this.othersFilter = this.expenseData.filter(res => res.paymentmode == "Net Banking")
    this.othersFilter.forEach((e: any) => {
      this.othersTotal = this.othersTotal + Number(e.amount);
    });

    //Paytm
    this.paytmFilter = this.expenseData.filter(res => res.paymentmode == "Paytm")
    this.paytmFilter.forEach((e: any) => {
      this.paytmTotal = this.paytmTotal + Number(e.amount);
    });


    //Total
    this.expenseData.forEach((e: any) => {
      this.total = this.total + Number(e.amount);
    });
  }


}
