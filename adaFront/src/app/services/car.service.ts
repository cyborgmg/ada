import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from './url.api';
import { Car } from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
/*
  constructor(private http: HttpClient) { }

  getCarsSmall() {
  return this.http.get<any>('assets/showcase/data/cars-small.json')
    .toPromise()
    .then(res => <Car[]>res.data)
    .then(data => data);
  }
*/

  constructor(private http: HttpClient) {}

  findCarParams(car: Car) {
    return this.http.post(`${URL_API}/api/car`, car);
  }

}
