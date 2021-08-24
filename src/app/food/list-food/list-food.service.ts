import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ApiEndpoints } from '../../api/apiEndpoints';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
};
@Injectable({
  providedIn: 'root'
})
export class ListFoodService {
  constructor(private httpClient: HttpClient) {}

  getFoods(pageNumber: number, pageSize: number): any {
    const url: string = ApiEndpoints.apiGetFoods + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize;
    return this.httpClient.get(url, httpOptions);
  }
  searchFood(name: string, pageNumber: number, pageSize: number): any {
    const url: string = ApiEndpoints.apiSearchFood + '?name=' + name + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize;
    return this.httpClient.get(url, httpOptions);
  }
}
