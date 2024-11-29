import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../model/task';
import { TaskService } from '../../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-index',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIcon],
  templateUrl: './task-index.component.html',
  styleUrl: './task-index.component.css'
})
export class TaskIndexComponent implements OnInit {

  private activateRoute = inject(ActivatedRoute)
  private taskService = inject(TaskService)
  private formBuilder = inject(FormBuilder);
  private snack = inject(MatSnackBar);


  public tasks: Task[] = []
  newTasks: Task[] = [];
  doingTasks: Task[] = [];
  doneTasks: Task[] = [];

  public idProject: string = '';
  public isEditing: boolean = false;
  public formTask!: FormGroup;

  constructor() {
    this.formTask = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      description: [''],
      status: ['']
    })

  }


  ngOnInit(): void {
    this.initData()
  }

  initData() {
    this.activateRoute.paramMap.subscribe(params => {
      let id = params.get('id');
      this.idProject = id;
      this.taskService.findByTaskProjectId(id).subscribe(data => {
        this.tasks = data;
        this.getTasksFromBackend();
      })
    })
  }

  openModal(task?: Task) {
    if (task) {
      this.isEditing = true;
      this.formTask.patchValue(task);
    } else {
      this.isEditing = false;
      this.formTask.reset();
    }
  }

  saveTask() {
    if (this.isEditing) {
      this.updateTask();
    } else {
      this.createTask();
    }
  }

  createTask() {
    const formData = { ...this.formTask.value };
    delete formData.status;
    if (this.formTask.invalid) {
      this.snack.open('The name is required', 'Alert', { duration: 2000 });
      return;
    }
    console.log('Formulario:', formData);

    this.taskService.saveTask(formData, this.idProject).subscribe({
      next: (response) => {
        console.log('Tarea creada:', response);
        this.initData();
        this.formTask.reset();
      },
      error: (error) => {
        console.log('Error al crear tarea:', error);
      }
    });

  }

  updateTask() {
    const formData = { ...this.formTask.value };
    delete formData.status;
    if (this.formTask.invalid) {
      this.snack.open('The name is required', 'Alert', { duration: 2000 });
      return;
    }
    console.log('Formulario:', formData.id);


    this.taskService.updateNameDescriptionTask(formData, formData.id).subscribe({
      next: (response) => {
        console.log('Tarea actualizada:', response);
        this.initData();
        this.formTask.reset();
      },
      error: (error) => {
        console.log('Error al actualizar tarea:', error);
      }
    });
  }

  changeStatus(taskId: string, newStatus: string): void {
    this.taskService.updateStatusTask(taskId, newStatus).subscribe({
      next: () => {
        this.initData();
      },
      error: (error) => {
        console.log('Error al cambiar estado:', error);
      }
    });
  }

  deleteTask(id: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(id).subscribe((response) => {
          console.log(response);
          this.initData();
          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success"
          });
        });
      }
    });

  }

  getTasksFromBackend(): void {
    this.newTasks = this.tasks.filter((task) => task.statusTask === 'NEW');
    this.doingTasks = this.tasks.filter((task) => task.statusTask === 'DOING');
    this.doneTasks = this.tasks.filter((task) => task.statusTask === 'DONE');
  }

}
