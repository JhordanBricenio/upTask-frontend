import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  public authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  public initials: string;



  constructor() {
    this.authService.usuario.email
  }

  ngOnInit(): void {
    this.userService.findByEmail(this.authService.usuario.email).subscribe({
      next: (response) => {
        this.initials = (response.name[0] || '').toUpperCase() +
         (response.lastName[0] || '').toUpperCase();
      }
    });
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
