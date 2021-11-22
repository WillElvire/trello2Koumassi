import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTodoPage } from './add-todo.page';

const routes: Routes = [
  {
    path: '',
    component: AddTodoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTodoPageRoutingModule {}
