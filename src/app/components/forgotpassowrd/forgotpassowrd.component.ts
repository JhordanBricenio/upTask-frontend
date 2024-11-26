import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {   FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroupDirective,
  NgForm, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-forgotpassowrd',
  standalone: true,
  imports: [MatInputModule,FormsModule,CommonModule,ReactiveFormsModule,
     MatFormFieldModule,RouterLink,  MatCardModule,MatFormFieldModule],
  templateUrl: './forgotpassowrd.component.html'
})
export class ForgotpassowrdComponent {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  private authService= inject(AuthService);
  private router=inject(Router);
  private snack = inject(MatSnackBar);

  
  sendEmail(){
    if (this.emailFormControl.invalid) {
      this.snack.open('Email requerido o no válido', 'AVISO', {
        duration: 2000,
      });
      return;
    }
    console.log(this.emailFormControl.value);
    this.authService.sendEmail({
      mailTo: this.emailFormControl.value}).subscribe(
      response=>{
      console.log(response)
      this.router.navigate(['/message']);
      Swal.fire('Send', `${response.message}`, 'success');
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
