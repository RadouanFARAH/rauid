import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsommateurPointsPageRoutingModule } from './consommateur-points-routing.module';

import { ConsommateurPointsPage } from './consommateur-points.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsommateurPointsPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [ConsommateurPointsPage]
})
export class ConsommateurPointsPageModule { }
