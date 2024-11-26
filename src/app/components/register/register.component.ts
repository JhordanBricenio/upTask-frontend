import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';

import Swal from 'sweetalert2'
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule
    , FormsModule, MatCardModule, MatFormFieldModule, MatProgressBarModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  public fb = inject(FormBuilder);
  private snack = inject(MatSnackBar);
  private userService = inject(UserService);
  private router = inject(Router);
  private authService = inject(AuthService);

  formUser = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    roles: [[]]
  });




  register() {
    if (this.formUser.invalid) {
      this.snack.open('All fields are required', 'Ok', {
        duration: 3000
      });
      return;
    }
    if (this.formUser.value.password !== this.formUser.value.password2) {
      this.snack.open('Passwords do not match', 'Ok', {
        duration: 3000
      });
      return;
    }
    console.log(this.formUser.value);
    const user: User = this.transformToUserModel(this.formUser.value);
    this.userService.saveUser(user).subscribe({
      next: (response) => {
        console.log(response);
        this.authService.guardarUsuario(response.jwt);
        this.authService.guardarToken(response.jwt);
        this.router.navigate(['/admin']);
        Swal.fire({
          title: "Saved",
          text: `Hola ${response.username}, ${response.message}`,
          icon: "success"
        });

      },
      error: (response) => {
        console.log(response);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error creating user!"
        });
      }
    });

  }


  transformToUserModel(formValue: any): User {
    return {
      id: formValue.id,
      name: formValue.name,
      lastName: formValue.lastName,
      email: formValue.email,
      password: formValue.password,
      roles: [] 
    };
  }

}


