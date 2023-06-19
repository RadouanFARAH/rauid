import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogaccountPageRoutingModule } from './logaccount-routing.module';

import { LogaccountPage } from './logaccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogaccountPageRoutingModule
  ],
  declarations: [LogaccountPage]
})
export class LogaccountPageModule {}
