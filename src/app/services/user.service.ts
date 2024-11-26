import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url;
  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  saveUser(user:User): Observable<any> {
    return this.http.post(this.url + 'auth/sign-up', user);
  }

}
