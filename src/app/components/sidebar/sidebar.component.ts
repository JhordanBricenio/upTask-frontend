import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public authService= inject(AuthService);
  private router=inject(Router);

  logout():void{
    let username = this.authService.usuario.email;
    this.authService.logout();
    Swal.fire('Adiós', `${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/']);
  }
}
