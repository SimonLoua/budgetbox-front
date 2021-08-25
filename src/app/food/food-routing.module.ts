import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FoodComponent} from './food/food.component';
import {ListFoodComponent} from './list-food/list-food.component';
import {UpdateFoodComponent} from './update-food/update-food.component';

const routes: Routes = [
  {
    path: '',
    component: FoodComponent,
    children: [
      { path: 'list', component: ListFoodComponent},
      { path: 'update/:id', component: UpdateFoodComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FoodRoutingModule { }
