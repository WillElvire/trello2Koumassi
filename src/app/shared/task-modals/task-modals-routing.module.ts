import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskModalsPage } from './task-modals.page';

const routes: Routes = [
  {
    path: '',
    component: TaskModalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskModalsPageRoutingModule {}
