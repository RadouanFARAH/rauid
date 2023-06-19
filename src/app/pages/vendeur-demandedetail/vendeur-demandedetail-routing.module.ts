import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendeurDemandedetailPage } from './vendeur-demandedetail.page';

const routes: Routes = [
  {
    path: '',
    component: VendeurDemandedetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendeurDemandedetailPageRoutingModule {}
