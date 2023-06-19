import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponsableMyVendPage } from './responsable-my-vend.page';

const routes: Routes = [
  {
    path: '',
    component: ResponsableMyVendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponsableMyVendPageRoutingModule {}
