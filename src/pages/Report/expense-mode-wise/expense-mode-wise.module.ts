import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpenseModeWisePage } from './expense-mode-wise';

@NgModule({
  declarations: [
    ExpenseModeWisePage,
  ],
  imports: [
    IonicPageModule.forChild(ExpenseModeWisePage),
  ],
})
export class ExpenseModeWisePageModule {}
