import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from './url.api';
import { Car } from '../model/car';
import { HttpRespPdfReqJsonService } from './http-resp-pdf-req-json.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) {}

  findCarParams(car: Car): Observable<Object> {
    return this.http.post(`${URL_API}/api/car/find`, car);
  }

  saveCar(car: Car): Observable<Object> {
    return this.http.post(`${URL_API}/api/car`, car);
  }

  deleteCar(id: number): Observable<Object> {
    return this.http.delete(`${URL_API}/api/car/${id}`);
  }

  printCars(data: any): Observable<Object> {
    return HttpRespPdfReqJsonService.post(`${URL_API}/api/car/print`, data);
  }

}
