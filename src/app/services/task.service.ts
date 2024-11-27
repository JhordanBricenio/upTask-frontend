import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { GLOBAL } from './GLOBAL';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

    public url;
    constructor(private http: HttpClient) {
      this.url = GLOBAL.url;
    }
    public findByTaskProjectId(id: string): Observable<Task[]> {
      return this.http.get<Task[]>(`${this.url}task/findByProjectId/${id}`);
    }
}
