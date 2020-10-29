import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeniusPage } from './genius.page';

const routes: Routes = [
  {
    path: '',
    component: GeniusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeniusPageRoutingModule {}
