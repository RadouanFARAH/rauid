import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResponsableMyVendPageRoutingModule } from './responsable-my-vend-routing.module';

import { ResponsableMyVendPage } from './responsable-my-vend.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResponsableMyVendPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [ResponsableMyVendPage]
})
export class ResponsableMyVendPageModule { }
