import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
/*
  Generated class for the NetworkProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkProvider {

  constructor(public http: HttpClient) {
    console.log('Hello NetworkProvider Provider');
  }

  apiPath= "http://testmyaccount.skytechhub.com/API/"
  loginAPI  = this.apiPath+"android/login.php";
  incomeAPI = this.apiPath+"android/income.php";
  expenseAPI = this.apiPath+"android/expense.php";
  totalIncomeExpenseAPI = this.apiPath +"GettingResponse/totalincome.php";
  getIncomeDataAPI = this.apiPath +"GettingResponse/income.php";
  getExpenseDataAPI = this.apiPath +"GettingResponse/expense.php";
  getCompanysAPI = this.apiPath +"GettingResponse/companydetails.php";
  addCompanyAPI = this.apiPath +"android/addCompany.php";
  addEmployeeAPI=this.apiPath+"android/addemployee.php";
  getEmployeeAPI = this.apiPath+"GettingResponse/employeedetails.php";
  getDashboardAPI = this.apiPath+"GettingResponse/companycount.php";
  getOnwerIdAPI = this.apiPath+"GettingResponse/getOwnerId.php";
  updatePassAPI = this.apiPath+"android/ChangePassword.php"
  updateforgotPassAPI = this.apiPath+"android/forgotpassword.php"
  chnageEmployeeStatusAPI = this.apiPath+"android/changeStatusemployee.php"
  chnageCompanyStatusAPI = this.apiPath+"android/changeStatusCompany.php"

  authenticate(data): Observable<any> {
   // console.log("API"+this.loginAPI+"?"+"emailid"+"="+email +"&"+"password"+"="+password);
    return this.http.post(this.loginAPI,data,  { responseType: 'text' })
      .catch(this.errorHandler);
  }

  addIncome(data): Observable<any> {
     return this.http.post(this.incomeAPI,data,  { responseType: 'text' })
       .catch(this.errorHandler);
   }

   addExpense(data): Observable<any> {
    return this.http.post(this.expenseAPI,data,  { responseType: 'text' })
      .catch(this.errorHandler);
  }

  totalIncomeExpense(data) : Observable<any>
  {
    return this.http.post(this.totalIncomeExpenseAPI,data,  { responseType: 'text' })
    .catch(this.errorHandler);
  }

  getIncomeData(data) : Observable<any>
  {
    return this.http.post(this.getIncomeDataAPI,data,  { responseType: 'text' })
    .catch(this.errorHandler);
  } 

  getExpenseData(data) : Observable<any>
  {
    return this.http.post(this.getExpenseDataAPI,data,  { responseType: 'text' })
    .catch(this.errorHandler);
  } 

  getCompaniesList(data)
  {
    return this.http.post(this.getCompanysAPI,data,  { responseType: 'text' })
    .catch(this.errorHandler);
  }

  addCompany(data)
  {
    return this.http.post(this.addCompanyAPI,data,  { responseType: 'text' })
    .catch(this.errorHandler);
  }

  addEmployees(data)
  {
    return this.http.post(this.addEmployeeAPI,data,  { responseType: 'text' })
    .catch(this.errorHandler);
  }

  getEmployeeList(data)
  {
    return this.http.post(this.getEmployeeAPI,data,  { responseType: 'text' })
    .catch(this.errorHandler);
  }

  getDashboardCount(data)
  {
    return this.http.post(this.getDashboardAPI,data,  { responseType: 'text' })
    .catch(this.errorHandler);
  }

  getOwnerId(data)
  {
    return this.http.post(this.getOnwerIdAPI,data,  { responseType: 'text' })
    .catch(this.errorHandler);
  }

  updatePass(data)
  {
    return this.http.post(this.updatePassAPI,data,  { responseType: 'text' })
    .catch(this.errorHandler);
  }

  forgotPass(data)
  {
    return this.http.post(this.updateforgotPassAPI,data,  { responseType: 'text' })
    .catch(this.errorHandler);
  }

  empStatusChange(data)
  {
    return this.http.post(this.chnageEmployeeStatusAPI,data,  { responseType: 'text' })
    .catch(this.errorHandler);
  }

  compStatusChange(data)
  {
    return this.http.post(this.chnageCompanyStatusAPI,data,  { responseType: 'text' })
    .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

 
}