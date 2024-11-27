import { Component, inject, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../../../model/project';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index-project',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink],
  templateUrl: './index-project.component.html',
  styleUrl: './index-project.component.css'
})
export class IndexProjectComponent implements OnInit {

  private proyectService = inject(ProjectService);
  private snack = inject(MatSnackBar);
  public projects: Project[] = [];


  constructor() { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.proyectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: () => {
        this.snack.open('Error loading projects', 'Alert', { duration: 2000 });
      }
    })
  }
  taskForProject(){
    console.log("task for project");
  }

  deleteProject(project: Project) {
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
        this.proyectService.deleteProject(project.id).subscribe((response) => {
          console.log(response);    
          this.projects = this.projects.filter((cli) => cli !== project);
          Swal.fire({
            title: "Deleted!",
            text: "Your poject has been deleted.",
            icon: "success"
          });
        });
      }
    });

  }







}
