import { Injectable } from '@angular/core';

export interface UsuarioRegistro {
  nombre: string;
  email: string;
  edad: number;
  password: string;
}

// Datos del usuario que pueden consultar los componentes una vez autenticado.
// La contraseña no se devuelve desde este servicio.
export type UsuarioAutenticado = Pick<UsuarioRegistro, 'nombre' | 'email' | 'edad'>;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Almacenamiento temporal para el ejercicio. Se reinicia al recargar la página.
  private usuarios: UsuarioRegistro[] = [];
  private usuarioActual: UsuarioAutenticado | null = null;

  registrar(usuario: UsuarioRegistro): boolean {
    const emailNormalizado = usuario.email.trim().toLowerCase();

    const existe = this.usuarios.some(
      usuarioGuardado => usuarioGuardado.email === emailNormalizado
    );

    if (existe) {
      return false;
    }

    this.usuarios.push({
      ...usuario,
      nombre: usuario.nombre.trim().replace(/\s+/g, ' '),
      email: emailNormalizado
    });

    return true;
  }

  iniciarSesion(email: string, password: string): boolean {
    const emailNormalizado = email.trim().toLowerCase();

    const usuario = this.usuarios.find(
      usuarioGuardado =>
        usuarioGuardado.email === emailNormalizado &&
        usuarioGuardado.password === password
    );

    if (!usuario) {
      return false;
    }

    // No conservar ni exponer la contraseña en el usuario autenticado.
    this.usuarioActual = {
      nombre: usuario.nombre,
      email: usuario.email,
      edad: usuario.edad
    };

    return true;
  }

  obtenerUsuario(): UsuarioAutenticado | null {
    return this.usuarioActual;
  }

  estaAutenticado(): boolean {
    return this.usuarioActual !== null;
  }

  cerrarSesion(): void {
    this.usuarioActual = null;
  }
}
