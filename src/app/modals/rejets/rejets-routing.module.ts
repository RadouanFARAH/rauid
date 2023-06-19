import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RejetsPage } from './rejets.page';

const routes: Routes = [
  {
    path: '',
    component: RejetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RejetsPageRoutingModule {}
