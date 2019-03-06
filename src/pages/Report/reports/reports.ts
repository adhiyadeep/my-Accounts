import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkProvider } from '../../../providers/network/network';
import { CommonProvider } from '../../../providers/common/common';
import { Storage } from '@ionic/storage'
import { DatePipe } from '@angular/common';
import { P } from '@angular/core/src/render3';
import { GraphReportPage } from '../graph-report/graph-report';


/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {
  data = { "companyname": "" };
  ownrId = { "ownerid": "" }
  //JSON of Total Income Expense 
  totalIncomeExpense: any;
  //Total Income
  totalIncome: any;
  //Total Expense
  totalExpense: any;
  //Summation of Income expense
  total: any;

  //Date Selection
  fromDate: any;
  toDate: any;

  //All Income Expense Data in JSON
  incomeData: any;
  expenseData: any;

  //dateGraph IncomeExp Report
  dateIncomeData: any;
  dateExpenseData: any;

  //companiesList
  companiesList: any

  //User role 
  role: any;
  companyAdmin: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public commonProvider: CommonProvider,
    public dataProvider: NetworkProvider,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
    this.getInfo();
  }


  getTotalIncomeExpense() {
    this.dataProvider.totalIncomeExpense(this.data).subscribe(res => {
      this.totalIncomeExpense = JSON.parse(res);
      this.totalIncome = this.totalIncomeExpense.income;
      this.totalExpense = this.totalIncomeExpense.expense;

      this.calculateSummary();

    }, err => {
      console.log(err)
    });
  }

  calculateSummary() {
    if (this.totalIncome > this.totalExpense) {
      this.total = this.totalExpense - this.totalIncome;
    } else {
      this.total = this.totalIncome - this.totalExpense;
    }

    this.getIncomeData()
  }


  selectCompany(name) {
    this.data.companyname = name;
    this.getTotalIncomeExpense();
  }


  getInfo() {
    this.storage.get("companyName").then(data => {
      if (data) {
        this.data.companyname = data;
        console.log(this.data.companyname);
        this.getTotalIncomeExpense();
      }
    }).catch(err => {
      console.log(err);
    });

    this.storage.get("ownerId").then(data => {
      if (data) {
        console.log(data)
        this.ownrId.ownerid = data;
        this.getCompanies()

      }
    }).catch(err => {
      console.log(err);
    });


    this.storage.get("role").then(data => {
      if (data) {
        console.log(data)
        this.role = data;

        if (this.role == "Admin") {
          this.companyAdmin = true;
        } else {
          this.companyAdmin = false;
        }

      }
    }).catch(err => {
      console.log(err);
    });


  }

  modeWiseIncome() {

    if (this.fromDate == undefined || this.toDate == undefined) {
      this.commonProvider.toastMessage("Please Select Dates.")
    } else if (this.fromDate > this.toDate) {
      this.commonProvider.toastMessage("Invalid Dates.")
    } else if (this.role == "Admin" && this.data.companyname == "") {
      this.commonProvider.toastMessage("Select Company!")
    }
    else {
      //Filter Data
      this.expenseData = this.dateExpenseData.filter((item: any) =>
        item.DMLDateTime >= this.fromDate && item.DMLDateTime <= this.toDate && item.companyname == this.data.companyname);

      this.incomeData = this.dateIncomeData.filter((item: any) =>
        item.DMLDateTime >= this.fromDate && item.DMLDateTime <= this.toDate && item.companyname == this.data.companyname);

      console.log(this.incomeData.length)
      if (this.expenseData.length == 0 && this.incomeData.length == 0) {
        this.commonProvider.toastMessage("No Income and Expense between selected dates")
      } else {

        this.navCtrl.push('IncomemodeWisePage', {
          'incomeData': this.incomeData,
          'fromDt': this.fromDate, 'toDt': this.toDate
        });
      }
    }
  }

  modeWiseExpense() {

    if (this.fromDate == undefined || this.toDate == undefined) {
      this.commonProvider.toastMessage("Please Select Dates.")
    }
    else if (this.fromDate > this.toDate) {
      this.commonProvider.toastMessage("Invalid Dates.")
    } else if (this.role == "Admin" && this.data.companyname == "") {
      this.commonProvider.toastMessage("Select Company!")
    }

    else {
      //Filter Data
      this.expenseData = this.dateExpenseData.filter((item: any) =>
        item.DMLDateTime >= this.fromDate && item.DMLDateTime <= this.toDate && item.companyname == this.data.companyname);

      this.incomeData = this.dateIncomeData.filter((item: any) =>
        item.DMLDateTime >= this.fromDate && item.DMLDateTime <= this.toDate && item.companyname == this.data.companyname);

      console.log(this.incomeData.length)
      if (this.expenseData.length == 0 && this.incomeData.length == 0) {
        this.commonProvider.toastMessage("No Income and Expense between selected dates")
      } else {


        this.navCtrl.push('ExpenseModeWisePage', {
          'expenseData': this.expenseData,
          'fromDt': this.fromDate, 'toDt': this.toDate
        });
      }
    }
  }

  showGraph() {
    if (this.fromDate == undefined || this.toDate == undefined) {
      this.commonProvider.toastMessage("Please Select Dates.")
    } else if (this.fromDate > this.toDate) {
      this.commonProvider.toastMessage("Invalid Dates.")
    } else if (this.role == "Admin" && this.data.companyname == "") {
      this.commonProvider.toastMessage("Select Company!")
    }
    else {
      //Filter Data
      this.expenseData = this.dateExpenseData.filter((item: any) =>
        item.DMLDateTime >= this.fromDate && item.DMLDateTime <= this.toDate && item.companyname == this.data.companyname);

      this.incomeData = this.dateIncomeData.filter((item: any) =>
        item.DMLDateTime >= this.fromDate && item.DMLDateTime <= this.toDate && item.companyname == this.data.companyname);

      console.log(this.incomeData.length)
      if (this.expenseData.length == 0 && this.incomeData.length == 0) {
        this.commonProvider.toastMessage("No Income and Expense between selected dates")
      } else {
        this.navCtrl.push('GraphReportPage', {
          'expenseData': this.expenseData, 'incomeData': this.incomeData,
          'fromDt': this.fromDate, 'toDt': this.toDate
        })
      }
    }
  }

  getIncomeData() {
    this.dataProvider.getIncomeData(this.ownrId).subscribe(res => {
      this.incomeData = JSON.parse(res).details;
      this.dateIncomeData = JSON.parse(res).details;
      this.getExpenseData()
    }, err => {
      console.log(err);
    })


  }

  //For Admin
  getCompanies() {
    this.dataProvider.getCompaniesList(this.ownrId).subscribe(res => {

      this.companiesList = JSON.parse(res);
    }, err => {
      console.log(err)
    });
  }
  getExpenseData() {

    this.dataProvider.getExpenseData(this.ownrId).subscribe(res => {
      this.expenseData = JSON.parse(res).exp;
      this.dateExpenseData = JSON.parse(res).exp;

    }, err => {
      console.log(err);
    })
  }

}
