import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListFoodComponent} from './food/list-food/list-food.component';
import {FoodComponent} from './food/food/food.component';
import {UpdateFoodComponent} from './food/update-food/update-food.component';

const appRoutes: Routes = [
  {
    path: 'food',
    component: FoodComponent,
    children: [
    {
      path: 'list',
      component: ListFoodComponent,
    },
    {
      path: 'update/:id',
      component: UpdateFoodComponent,
    }
    ]
  },
  {
    path: '',
    redirectTo: '/food/list',
    pathMatch: 'full'
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
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
