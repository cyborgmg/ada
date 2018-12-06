import { Injectable } from '@angular/core';
import { Car } from '../model/car';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { ResponseApi } from '../model/response-api';

@Injectable({
  providedIn: 'root'
})
export class CarMokService {

  private resp: ResponseApi = new ResponseApi();

  constructor() {
    this.resp.data = new Array<Car>();
    this.resp.errors = new Array<string>();
   }

  findCarParams(car: Car): Observable<Object> {
    return of(this.resp);
  }

  saveCar(car: Car): Observable<Object> {

    const data: Array<Car> = this.resp.data;
    data.push(car);
    this.resp.data = data;

    const respApi: ResponseApi = new ResponseApi();
    respApi.data = car;
    respApi.errors = new Array<string>();

    return of(respApi);
  }

  deleteCar(id: number): Observable<Object> {

    const data: Array<Car> = this.resp.data;

    let idx = 0;
    data.forEach(element => {
      if (element.id === id) {
        data.splice(idx, 1);
      }
      idx++;
    });

    this.resp.data = data;

    return of(this.resp);
  }

  printCars(data: any): Observable<Object> {
    return of(new Blob());
  }
}
