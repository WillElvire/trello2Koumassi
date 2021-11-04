import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./pages/dashboard/task/task.module').then( m => m.TaskPageModule)
  },
  {
    path: 'add-list',
    loadChildren: () => import('./pages/dashboard/Adding/add-list/add-list.module').then( m => m.AddListPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
