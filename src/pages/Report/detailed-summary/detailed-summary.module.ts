import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailedSummaryPage } from './detailed-summary';

@NgModule({
  declarations: [
    DetailedSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailedSummaryPage),
  ],
})
export class DetailedSummaryPageModule {}
