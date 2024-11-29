import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { GLOBAL } from './GLOBAL';
import { Task } from '../model/task';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private authService = inject(AuthService);

  public url;
  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }
  public saveTask(task: Task, idProject: string): Observable<Task> {
    const params = new HttpParams().set('idProject', idProject);
    return this.http.post<Task>(`${this.url}task/add`, task,
      { params, headers: this.authService.agregarAuthorizationHeader() });

  }
  public findByTaskProjectId(id: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}task/findByProjectId/${id}`
      , { headers: this.authService.agregarAuthorizationHeader() });
  }
  public updateNameDescriptionTask(task: Task, id: string): Observable<Task> {
    return this.http.put<Task>(`${this.url}task/update/${id}`, task, {headers: this.authService.agregarAuthorizationHeader()});
  }

  updateStatusTask(tareaId: string, status: string): Observable<Task> {
    const params = new HttpParams().set('status', status);
    return this.http.put<Task>(`${this.url}task/${tareaId}/status`, {}, 
      { params,headers: this.authService.agregarAuthorizationHeader() });
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}task/delete/${id}`);
  }
}
