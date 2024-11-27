import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../model/task';
import { TaskService } from '../../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-index.component.html',
  styleUrl: './task-index.component.css'
})
export class TaskIndexComponent implements OnInit {

  private activateRoute = inject(ActivatedRoute)
  private taskService = inject(TaskService)
  public tasks: Task[] = []

  constructor() { }

  ngOnInit(): void {
    this.initData()
  }

  initData() {

    this.activateRoute.paramMap.subscribe(params => {
      let id=params.get('id');
      this.taskService.findByTaskProjectId(id).subscribe(data => {
        this.tasks = data
        console.log(data);
        
      })
    })
  }

}
