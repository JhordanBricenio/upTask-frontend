import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { User } from '../../model/user';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,MatInputModule, MatFormFieldModule, ReactiveFormsModule
    , MatCardModule,MatFormFieldModule, MatProgressBarModule, RouterLink, MatSnackBarModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.required]);

  matcher = new MyErrorStateMatcher();

  user: User;

  private snack = inject(MatSnackBar);
  private authService= inject(AuthService);
  private router=inject(Router);
  constructor(){
    this.user= new User;

  }

  login():void{   
    if(this.emailFormControl.invalid || this.passwordFormControl.invalid){
      this.snack.open('Email o password incorrectos', 'AVISO', {duration: 2000});
      return;
    }
    this.authService.login(this.user).subscribe(response => {  
      this.authService.guardarUsuario(response.jwt);
      this.authService.guardarToken(response.jwt);
      let usuario = this.authService.usuario;
      this.router.navigate(['/admin']);
      Swal.fire('Login', `Hola ${usuario.email}, ${response.message}`, 'success');
    },
    err => {
      if(err.status == 401 || err.status == 403 ){
        Swal.fire('Error Login', 'Usuario o clave incorrecta!', 'error');
      }
    }
    );
    
    

  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
