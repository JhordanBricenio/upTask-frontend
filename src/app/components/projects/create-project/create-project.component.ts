import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../../../services/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, CommonModule, MatIconModule, MatInputModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {

  private snack = inject(MatSnackBar);
  private projectService = inject(ProjectService);
  private formBuilder = inject(FormBuilder);
  public edit: boolean = false;

  formProject!: FormGroup;

  constructor() {
    this.formProject = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      status: ['']
    })

  }


  create(): void {
    const formData = { ...this.formProject.value };
    delete formData.status;

    if (this.formProject.invalid) {
      this.snack.open('The name is required', 'Alert', { duration: 2000 });
      return;
    }
    this.projectService.createProject(formData)
      .subscribe({
        next: () => {
          Swal.fire({
            title: "Saved?",
            text: "Project saved successfully",
            icon: "success"
          });
        },

        error: () => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error creating project!"
          });
        }

      })
  }

  update() {

  }
}

