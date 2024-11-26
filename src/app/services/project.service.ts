import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Project } from '../model/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public url;
  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  public createProject(data: Project): Observable<Project> {
    return this.http.post<Project>(`${this.url}project/save`, data);
  }

  public getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.url}project/findAll`);
  }

  public getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.url}project/findById/${id}`);
  }

  public deleteProject(id: number): Observable<string> {
    return this.http.delete<string>(`${this.url}project/delete/${id}`);
  }
}
