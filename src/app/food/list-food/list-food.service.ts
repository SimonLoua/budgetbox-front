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
  // getFoods(page: number, size: number) {
  //   return this.httpClient.get(ApiEndpoints.apiGetFood + '?pageNumber=' + page + '&size=' + size);
  // }
  getFoods(): any {
    return this.httpClient.get(ApiEndpoints.apiGetFood, httpOptions);
      // .pipe(tap((resultat) => console.log('Résultat de la requête : ', resultat)),
      //   catchError(this.handleError));
  }

  // handleError(error) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(errorMessage);
  // }

}
