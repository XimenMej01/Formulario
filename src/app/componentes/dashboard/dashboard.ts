import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  nombreUsuario = 'Invitado';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    const usuario = this.authService.obtenerUsuario();

    if (usuario) {
      this.nombreUsuario = usuario.nombre;
    }
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
