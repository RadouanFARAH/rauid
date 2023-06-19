import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendeurAddproductPage } from './vendeur-addproduct.page';

const routes: Routes = [
  {
    path: '',
    component: VendeurAddproductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendeurAddproductPageRoutingModule {}
