import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inicio-sesion.html',
  styleUrls: ['./inicio-sesion.css']
})
export class InicioSesionComponent {
  loginForm: FormGroup;
  mensajeError = '';
  mensajeRegistro = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    if (this.route.snapshot.queryParamMap.get('registrado') === 'true') {
      this.mensajeRegistro =
        'Registro realizado correctamente. Ahora puedes iniciar sesión.';
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.mensajeError = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = String(this.f['email'].value).trim().toLowerCase();
    const password = String(this.f['password'].value);

    if (this.authService.iniciarSesion(email, password)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.mensajeError = 'Correo electrónico o contraseña incorrectos.';
    }
  }

  irRegistro(): void {
    this.router.navigate(['/registro']);
  }
}
