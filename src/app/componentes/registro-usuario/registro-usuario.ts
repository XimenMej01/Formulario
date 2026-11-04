import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-usuario.html',
  styleUrls: ['./registro-usuario.css']
})
export class RegistroUsuarioComponent {
  registroForm: FormGroup;
  mensajeError = '';

  // Admite letras españolas, tildes, diéresis, ñ y espacios entre nombres.
  // Rechaza números, signos de puntuación y otros caracteres especiales.
  private readonly nombrePattern =
    /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registroForm = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(this.nombrePattern)
        ]
      ],
      email: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.registroForm.controls;
  }

  onSubmit(): void {
    this.mensajeError = '';

    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    const datos = this.registroForm.getRawValue();
    const usuario = {
      nombre: String(datos.nombre).trim().replace(/\s+/g, ' '),
      email: String(datos.email).trim().toLowerCase(),
      edad: Number(datos.edad),
      password: String(datos.password)
    };

    const registrado = this.authService.registrar(usuario);

    if (!registrado) {
      this.mensajeError = 'Este correo electrónico ya se encuentra registrado.';
      return;
    }

    // Después del registro, el usuario debe iniciar sesión por separado.
    this.router.navigate(['/login'], {
      queryParams: { registrado: 'true' }
    });
  }

  irLogin(): void {
    this.router.navigate(['/login']);
  }
}
