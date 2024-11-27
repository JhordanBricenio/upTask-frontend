import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  public authService = inject(AuthService);
  private router= inject(Router);
  

  constructor() {     
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
