import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsommateurPointsPage } from './consommateur-points.page';

const routes: Routes = [
  {
    path: '',
    component: ConsommateurPointsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsommateurPointsPageRoutingModule {}
