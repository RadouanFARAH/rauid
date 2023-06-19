import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogcityPageRoutingModule } from './logcity-routing.module';

import { LogcityPage } from './logcity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogcityPageRoutingModule
  ],
  declarations: [LogcityPage]
})
export class LogcityPageModule {}
