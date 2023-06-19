import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendeurMyConsoPage } from './vendeur-my-conso.page';

const routes: Routes = [
  {
    path: '',
    component: VendeurMyConsoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendeurMyConsoPageRoutingModule {}
