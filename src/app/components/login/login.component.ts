import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule
    , MatCardModule, MatFormFieldModule, MatProgressBarModule, RouterLink, MatSnackBarModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  private formBuilder = inject(FormBuilder);
  formProject!: FormGroup;

  private snack = inject(MatSnackBar);
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor() {
    this.formProject = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(): void {
    if (this.formProject.invalid || this.formProject.invalid) {
      this.snack.open('Email o password incorrectos', 'AVISO', { duration: 2000 });
      return;
    }
    this.authService.login(this.formProject.value)
      .subscribe({
        next: (response) => {
          this.authService.guardarUsuario(response.jwt);
          this.authService.guardarToken(response.jwt);
          let usuario = this.authService.usuario;
          this.router.navigate(['/admin']);
          Swal.fire('Login', `Hola ${usuario.email}, ${response.message}`, 'success');
        },
        error: (err) => {
          if (err.status == 401 || err.status == 403) {
            Swal.fire('Error Login', 'Usuario o clave incorrecta!', 'error');
          }
        }
      });
  }
}

