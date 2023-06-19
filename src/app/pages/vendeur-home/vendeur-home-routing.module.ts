import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendeurHomePage } from './vendeur-home.page';

const routes: Routes = [
  {
    path: '',
    component: VendeurHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendeurHomePageRoutingModule {}
