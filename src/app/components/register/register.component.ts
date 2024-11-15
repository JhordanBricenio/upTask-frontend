import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../model/user';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule,MatInputModule, MatFormFieldModule, ReactiveFormsModule
    ,FormsModule, MatCardModule,MatFormFieldModule, MatProgressBarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  user: User;
  

  register(){

  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
