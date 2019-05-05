import { Injectable } from '@angular/core';
import { Car } from '../model/car';
import { Observable } from 'rxjs';
import { of, empty } from 'rxjs';
import { ResponseApi } from '../model/response-api';
import { Utils } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class CarMokService {

  private cars: Array<Car> = new Array<Car>();

  constructor() {
    this.cars = new Array<Car>();
   }

  findCarParams(car: Car): Observable<Object> {

    if (( car.brand == null ) && ( car.status == null ) && ( car.year == null ) &&
    ( car.color == null ) && ( car.price == null ) && ( car.saleDate == null )) {

      return of( new ResponseApi( this.cars , []) );

    } else {

      return of( new ResponseApi( new Array<Car>() , []) );

    }
  }

  saveCar(car: Car): Observable<Object> {

    const carclone: Car = Utils.clone(car);
    carclone.id = Math.round((Math.random() * 10000));
    this.cars.push( Utils.clone(carclone) );

    return of( new ResponseApi(carclone, []) );
  }

  deleteCar(id: number): Observable<Object> {

    let idx = 0;
    this.cars.forEach(element => {
      if (element.id === id) {
        this.cars.splice(idx, 1);
      }
      idx++;
    });

    return of(null);
  }

  printCars(data: any): Observable<Object> {
    return of(new Blob());
  }
}
