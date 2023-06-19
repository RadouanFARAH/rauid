import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponsableSettingsPage } from './responsable-settings.page';

const routes: Routes = [
  {
    path: '',
    component: ResponsableSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponsableSettingsPageRoutingModule {}
