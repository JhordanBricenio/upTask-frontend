import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Project } from '../model/project';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private authService = inject(AuthService);

  public url;
  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  public createProject(data: Project): Observable<Project> {
    return this.http.post<Project>(`${this.url}project/save`, data,
      { headers: this.authService.agregarAuthorizationHeader() });
  }

  public getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.url}project/findAll`,
      { headers: this.authService.agregarAuthorizationHeader() });
  }

  public getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.url}project/findById/${id}`);
  }

  public deleteProject(id: number): Observable<string> {
    return this.http.delete<string>(`${this.url}project/delete/${id}`);
  }
}
