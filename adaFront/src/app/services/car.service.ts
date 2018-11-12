import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from './url.api';
import { Car } from '../model/car';
import { HttpRespPdfReqJsonService } from './http-resp-pdf-req-json.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) {}

  findCarParams(car: Car) {
    return this.http.post(`${URL_API}/api/car/find`, car);
  }

  saveCar(car: Car) {
    return this.http.post(`${URL_API}/api/car`, car);
  }

  deleteCar(id: number) {
    return this.http.delete(`${URL_API}/api/car/${id}`);
  }

  printCars(data: any) {
    return HttpRespPdfReqJsonService.post(`${URL_API}/api/car/print`, data);
    /*
    return  Observable.create(observer => {
              const xhr = new XMLHttpRequest();
              xhr.open('POST', `${URL_API}/api/car/print`, true);
              xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
              xhr.setRequestHeader('Content-type', 'application/json');
              xhr.responseType = 'blob';
              xhr.onreadystatechange = () => {
                  if (xhr.readyState === 4) {
                      if (xhr.status === 200) {
                          const contentType = 'application/pdf';
                          const blob = new Blob([xhr.response], { type: contentType });
                          observer.next(blob);
                          observer.complete();
                      } else {
                          observer.error(xhr.response);
                      }
                  }
              };
              xhr.send(JSON.stringify(entity));
            });
    */
  }

}
