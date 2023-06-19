import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogaccountPage } from './logaccount.page';

const routes: Routes = [
  {
    path: '',
    component: LogaccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogaccountPageRoutingModule {}
