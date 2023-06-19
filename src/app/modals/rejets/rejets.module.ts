import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RejetsPageRoutingModule } from './rejets-routing.module';

import { RejetsPage } from './rejets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RejetsPageRoutingModule
  ],
  declarations: [RejetsPage]
})
export class RejetsPageModule {}
