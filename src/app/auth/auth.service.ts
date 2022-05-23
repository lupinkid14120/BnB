import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = true;

  constructor() { };

  get userAuthenticated(){
    // eslint-disable-next-line no-underscore-dangle
    return this._userIsAuthenticated;
  };

  login() {
    // eslint-disable-next-line no-underscore-dangle
    this._userIsAuthenticated = true;
  }

  logout() {
    // eslint-disable-next-line no-underscore-dangle
    this._userIsAuthenticated = false;
  }
}
