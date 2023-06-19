import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsommateurDemandehistoriquePage } from './consommateur-demandehistorique.page';

const routes: Routes = [
  {
    path: '',
    component: ConsommateurDemandehistoriquePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsommateurDemandehistoriquePageRoutingModule {}
