import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanysPage } from './companys';

@NgModule({
  declarations: [
    CompanysPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanysPage),
  ],
})
export class CompanysPageModule {}
