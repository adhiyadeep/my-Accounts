import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeeDashboardPage } from './employee-dashboard';

@NgModule({
  declarations: [
    EmployeeDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeeDashboardPage),
  ],
})
export class EmployeeDashboardPageModule {}
