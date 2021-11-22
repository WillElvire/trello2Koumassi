import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AccessGuardGuard } from './guards/access/access-guard.guard';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    pathMatch:'full',
    redirectTo:'home'
  },
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/request/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/request/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'task',
    loadChildren: () => import('./pages/dashboard/task/task.module').then( m => m.TaskPageModule),
    canActivate:[AccessGuardGuard]
  },
  {
    path: 'add-list',
    loadChildren: () => import('./pages/dashboard/Adding/add-list/add-list.module').then( m => m.AddListPageModule),
    canActivate:[AccessGuardGuard]
  },
  {
    path: 'add-task',
    loadChildren: () => import('./shared/task-modals/task-modals.module').then( m => m.TaskModalsPageModule),
    canActivate:[AccessGuardGuard]
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./pages/dashboard/detail/detail.module').then( m => m.DetailPageModule),
    canActivate:[AccessGuardGuard]
  },
  {
    path: 'add-todo/:id',
    loadChildren: () => import('./pages/dashboard/add-todo/add-todo.module').then( m => m.AddTodoPageModule),
    canActivate:[AccessGuardGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
