import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeniusPageRoutingModule } from './genius-routing.module';

import { GeniusPage } from './genius.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeniusPageRoutingModule
  ],
  declarations: [GeniusPage]
})
export class GeniusPageModule {}
