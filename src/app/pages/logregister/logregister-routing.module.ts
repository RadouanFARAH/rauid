import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogregisterPage } from './logregister.page';

const routes: Routes = [
  {
    path: '',
    component: LogregisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogregisterPageRoutingModule {}
