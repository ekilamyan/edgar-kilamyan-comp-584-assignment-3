import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {

  baseUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  // getQuery(query: string): Observable<any> {
  //   return this.http.get(this.baseUrl + '/test/' + query);
  // }

  getQuery(term: string, city: string, state: string, open: string, sortingMethod: string): Observable<any> {
    return this.http.get(this.baseUrl + '/getBusinessBy/' + term  + '/' + city + '/' + state + '/' + open + '/' + sortingMethod);
  }
  
  // , sorting: string
  // + '/' + sorting

}
