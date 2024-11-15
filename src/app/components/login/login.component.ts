import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
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


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,MatInputModule, MatFormFieldModule, ReactiveFormsModule
    ,FormsModule, MatCardModule,MatFormFieldModule, MatProgressBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  user: User;
  

  login(){

  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
