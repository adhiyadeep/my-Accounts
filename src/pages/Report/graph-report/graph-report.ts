import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { DetailedSummaryPage } from '../detailed-summary/detailed-summary';
/**
 * Generated class for the GraphReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-graph-report',
  templateUrl: 'graph-report.html',
})
export class GraphReportPage {
  @ViewChild('barCanvas') barCanvas;

  barChart: any;
  //Get Params
  fromDt: any;
  toDt: any;
  incomeData: any;
  expenseData: any;

  //Total

  incomeTotal: number = 0;
  expenseTotal: number = 0;
  summaryTotal: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Graph Report Page');


    this.summaryCalulation();
  
  }
  ionViewWillEnter() {

    console.log("Income Tot" + this.incomeData);
    console.log("Expense Tot" + this.expenseTotal);
  }


  summaryCalulation()
  {
    this.incomeData = this.navParams.get('incomeData');
    this.expenseData = this.navParams.get('expenseData');
    this.fromDt = this.navParams.get('fromDt');
    this.toDt = this.navParams.get('toDt');



    this.incomeData.forEach((e: any) => {
      this.incomeTotal = this.incomeTotal + Number(e.amount);
    });

    this.expenseData.forEach((e: any) => {
      this.expenseTotal = this.expenseTotal + Number(e.amount);
    });


    this.summaryTotal = this.incomeTotal - this.expenseTotal;
    console.log(this.summaryTotal)

    this.generateGraph();


  }

  generateGraph() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: ["Income", "Expense"],
        datasets: [{
          label: '# of Income',
          data: [this.incomeTotal, this.expenseTotal],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',

          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 0.5
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

    });

  }

  details()
{

  this.navCtrl.push('DetailedSummaryPage',{'incomeData' :this.incomeData ,
  'expenseData':this.expenseData
})
}

}
