import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ApiEndpoints } from '../../api/apiEndpoints';
import {Food} from '../food.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
};
@Injectable({
  providedIn: 'root'
})
export class FoodService {
  constructor(private httpClient: HttpClient) {}

  getFood(id: number): any {
    const url: string = ApiEndpoints.apiGetFood + '/' + id;
    return this.httpClient.get(url, httpOptions);
  }
  getFoods(pageNumber: number, pageSize: number): any {
    const url: string = ApiEndpoints.apiGetFoods + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize;
    return this.httpClient.get(url, httpOptions);
  }
  searchFood(name: string, pageNumber: number, pageSize: number): any {
    const url: string = ApiEndpoints.apiSearchFood + '?name=' + name + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize;
    return this.httpClient.get(url, httpOptions);
  }

  update(food: Food): any {
    return this.httpClient.put(ApiEndpoints.apiPutFood, food, httpOptions);
  }

  delete(id: number): any {
    const url: string = ApiEndpoints.apiDeleteFood + '/' + id;
    return this.httpClient.delete(url, httpOptions);
  }

  // No code is complete without a useless TODO commentary that will never be solved
  save(food: Food): any {
    return this.httpClient.post(ApiEndpoints.apiPostFood, food, httpOptions);
  }
}
