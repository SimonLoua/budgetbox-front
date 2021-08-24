import { NgModule } from '@angular/core';
import {UpdateFoodComponent} from './update-food/update-food.component';
import {ListFoodComponent} from './list-food/list-food.component';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    UpdateFoodComponent,
    ListFoodComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    ListFoodComponent,
  ],
  providers: []
})
export class FoodModule {
  constructor() {
  }
}
