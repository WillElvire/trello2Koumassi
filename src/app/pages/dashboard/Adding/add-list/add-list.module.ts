import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddListPageRoutingModule } from './add-list-routing.module';

import { AddListPage } from './add-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddListPageRoutingModule
  ],
  declarations: [AddListPage]
})
export class AddListPageModule {}
