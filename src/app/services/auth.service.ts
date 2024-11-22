import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httheaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private _usuario: User;
  private _token: string;

  public url: string;

  private urlEmail = "http://localhost:8080/";

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  public get usuario(): User {
    if (this._usuario != null) {
      return this._usuario;
    }
    else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as User;
      return this._usuario;
    }
    return new User();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    }
    else if (this._token == null && sessionStorage.getItem('jwt') != null) {
      this._token = sessionStorage.getItem('jwt');
      return this._token;
    }
    return null;
  }

  public login(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.url}auth/sign-in`, loginData);
  }

  public sendEmail(dto: { mailTo: string }): Observable<any> {
    return this.http.post<any>(
      `${this.urlEmail}email-password/send-email`,
      dto,
      { headers: this.httheaders }
    );
  }

  public changePassword(dto: {
    password: string, confirmPassword: string,
    tokenPassword: string
  }): Observable<any> {
    return this.http.post<any>(
      `${this.urlEmail}email-password/change-password`,
      dto,
      { headers: this.httheaders }
    )
  }

  public agregarAuthorizationHeader() {
    let token = this.token;
    if (token != null) {
      return this.httheaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httheaders;
  }

  public guardarUsuario(accessToken: string) {
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new User();
    this._usuario.name = payload.user;
    this._usuario.email = payload.sub;
    this._usuario.roles = payload.auth;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));

  }
  public guardarToken(accessToken: string) {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }
  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }
  isAuntenitcated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.sub > 0) {
      return true;
    }
    return false;
  }
  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
  }
  public getUserRole(): string {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.authorities[0].authority) {
      return payload.authorities[0].authority;

    }
    return null;
  }

  hasRole(role: string): boolean {
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;

  }

}