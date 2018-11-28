import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { URL_API } from './url.api';
import { HttpRespPdfReqJsonService } from './http-resp-pdf-req-json.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post(`${URL_API}/api/auth`, user);
  }

  save(user: User) {
      return this.http.post(`${URL_API}/api/user`, user);
  }

  findUserParams(user: User) {
    return this.http.post(`${URL_API}/api/user/find`, user);
  }

  delete(id: string) {
    return this.http.delete(`${URL_API}/api/user/${id}`);
  }

  getUser() {
    return this.http.get(`${URL_API}/api/token`);
  }

  print(data: any) {
    return HttpRespPdfReqJsonService.post(`${URL_API}/api/user/print`, data);
  }

}
