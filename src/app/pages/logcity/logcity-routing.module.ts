import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogcityPage } from './logcity.page';

const routes: Routes = [
  {
    path: '',
    component: LogcityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogcityPageRoutingModule {}
