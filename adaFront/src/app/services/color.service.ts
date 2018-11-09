import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from './url.api';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http: HttpClient) {}

  findAllDropDown() {
    return this.http.get(`${URL_API}/api/color/dropdown`);
  }
}
