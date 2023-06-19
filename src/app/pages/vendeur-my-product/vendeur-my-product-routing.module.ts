import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendeurMyProductPage } from './vendeur-my-product.page';

const routes: Routes = [
  {
    path: '',
    component: VendeurMyProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendeurMyProductPageRoutingModule {}
