import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = false;
  private _userId = 'xyz';

  constructor() { };

  get userAuthenticated(){
    // eslint-disable-next-line no-underscore-dangle
    return this._userIsAuthenticated;
  };

  get userId(){
      // eslint-disable-next-line no-underscore-dangle
      return this._userId;
  }

  login() {
    // eslint-disable-next-line no-underscore-dangle
    this._userIsAuthenticated = true;
  }

  logout() {
    // eslint-disable-next-line no-underscore-dangle
    this._userIsAuthenticated = false;
  }
}
