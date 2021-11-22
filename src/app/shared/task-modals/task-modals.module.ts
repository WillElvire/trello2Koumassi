import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskModalsPageRoutingModule } from './task-modals-routing.module';

import { TaskModalsPage } from './task-modals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskModalsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TaskModalsPage]
})
export class TaskModalsPageModule {}
