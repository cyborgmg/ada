import { Injectable, EventEmitter } from '@angular/core';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public static instance: SharedService = null;
  private _user: User;
  private _token: string;
  showTemplate = new EventEmitter<boolean>();

  constructor() {

    return SharedService.instance = SharedService.instance || this;

  }

  public static getInstance() {

    if (this.instance === null) {
      this.instance = new SharedService();
    }
    return this.instance;
  }

  isLoggedIn(): boolean {
    try {
      return this.user.email !== '';
    } catch (err) {
      return false;
    }

  }

  public get token(): string {
    this._token = localStorage.getItem('token');
    return this._token;
  }
  public set token(value: string) {
    this._token = value;
    localStorage.setItem('token', this._token);
  }

  public get user(): User {
    this._user = JSON.parse(localStorage.getItem('user'));
    return this._user;
  }
  public set user(value: User) {
    this._user = value;
    if (this._user != null) {
     this._user.profile = this._user.profile.substring(5);
    }
    localStorage.setItem('user', JSON.stringify(this._user));
  }

}
