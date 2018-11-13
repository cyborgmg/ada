import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { URL_API } from './url.api';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post(`${URL_API}/api/auth`, user);
  }

  createOrUpdate(user: User) {
    if ( user.id !== null && user.id !== '') {
      return this.http.put(`${URL_API}/api/user`, user);
    } else {
      user.id = null;
      return this.http.post(`${URL_API}/api/user`, user);
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${URL_API}/api/user/${page}/${count}`);
  }

  findById(id: string) {
    return this.http.get(`${URL_API}/api/user/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${URL_API}/api/user/${id}`);
  }

  getUser() {
    return this.http.get(`${URL_API}/api/getuser/${SharedService.getInstance().token}`);
  }

}
