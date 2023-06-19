import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirecteurHomePageRoutingModule } from './directeur-home-routing.module';

import { DirecteurHomePage } from './directeur-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirecteurHomePageRoutingModule
  ],
  declarations: [DirecteurHomePage]
})
export class DirecteurHomePageModule {}
