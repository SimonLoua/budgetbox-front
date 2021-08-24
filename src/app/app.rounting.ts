import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {ListFoodComponent} from './food/list-food/list-food.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'foodtest',
        component: ListFoodComponent
      },
      {
        path: 'food',
        loadChildren: () => import('./food/food.module').then(m => m.FoodModule),
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/pagenotfound',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
