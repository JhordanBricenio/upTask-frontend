import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup,
  FormGroupDirective, FormsModule, NgForm,
  ReactiveFormsModule, Validators
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-restart-passowrd',
  standalone: true,
  imports: [MatInputModule, FormsModule, CommonModule, ReactiveFormsModule,
    MatFormFieldModule, RouterLink, MatCardModule, MatFormFieldModule],
  templateUrl: './restart-passowrd.component.html'
})
export class RestartPassowrdComponent {

  private activateRoute = inject(ActivatedRoute);
  private authService = inject(AuthService)
  private route=inject(Router);

  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {

    const password = this.passwordForm.get('password')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;

    this.activateRoute.params.subscribe(
      params => {
        let token = params['token'];
        if (token) {
          this.authService.changePassword({
            password: password,
            confirmPassword: confirmPassword,
            tokenPassword: token,
          }).subscribe({
            next: response => {
              alert(response.message);
              Swal.fire('Update', `${response.message}`, 'success');
              this.route.navigate(['/login']);
            },
            error: error => {
              if (error.status === 400 ||error.status === 404) {
                alert(error.error.message);
              } else {
                console.error('Error inesperado:', error);
              }
              this.passwordForm.reset();
            },
            complete: () => {
              console.log('Solicitud completada.');
            }
          });
        }
      }
    );


    if (this.passwordForm.valid) {
      console.log('Formulario válido. Contraseñas:', this.passwordForm.value);
    } else {
      console.log('Formulario inválido.');
    }
  }

}







export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

