import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authService= inject(AuthService);

  public url;
  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  saveUser(user:User): Observable<any> {
    return this.http.post(this.url + 'auth/sign-up', user);
  }

  findByEmail(email: string): Observable<any> {
    return this.http.get(`${this.url+'user/findByEmail'}/${email}`,{ headers: this.authService.agregarAuthorizationHeader()});
  }

}
