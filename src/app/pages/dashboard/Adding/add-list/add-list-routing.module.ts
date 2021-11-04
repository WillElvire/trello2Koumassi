import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddListPage } from './add-list.page';

const routes: Routes = [
  {
    path: '',
    component: AddListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddListPageRoutingModule {}
