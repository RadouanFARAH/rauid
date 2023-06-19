import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResponsableHomePageRoutingModule } from './responsable-home-routing.module';

import { ResponsableHomePage } from './responsable-home.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResponsableHomePageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [ResponsableHomePage]
})
export class ResponsableHomePageModule { }
