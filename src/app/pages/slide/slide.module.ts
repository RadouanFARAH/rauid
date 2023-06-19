import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { SlidePageRoutingModule } from './slide-routing.module';

import { SlidePage } from './slide.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    SlidePageRoutingModule
  ],
  declarations: [SlidePage]
})
export class SlidePageModule {}
