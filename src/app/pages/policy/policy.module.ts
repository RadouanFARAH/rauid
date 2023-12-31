import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicyPageRoutingModule } from './policy-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { PolicyPage } from './policy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolicyPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [PolicyPage]
})
export class PolicyPageModule {}
