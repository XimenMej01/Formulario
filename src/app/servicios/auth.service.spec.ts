import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should register a user and authenticate with matching credentials', () => {
    const usuario = {
      nombre: 'Ximena Mejía',
      email: 'ximena@example.com',
      edad: 20,
      password: '123456'
    };

    expect(service.registrar(usuario)).toBeTrue();
    expect(service.iniciarSesion('XIMENA@example.com', '123456')).toBeTrue();
    expect(service.estaAutenticado()).toBeTrue();
    expect(service.obtenerUsuario()?.nombre).toBe('Ximena Mejía');
  });

  it('should reject a duplicate email', () => {
    const usuario = {
      nombre: 'Ximena Mejía',
      email: 'ximena@example.com',
      edad: 20,
      password: '123456'
    };

    expect(service.registrar(usuario)).toBeTrue();
    expect(service.registrar({ ...usuario, email: ' XIMENA@example.com ' })).toBeFalse();
  });

  it('should reject incorrect credentials', () => {
    service.registrar({
      nombre: 'Ximena Mejía',
      email: 'ximena@example.com',
      edad: 20,
      password: '123456'
    });

    expect(service.iniciarSesion('ximena@example.com', 'incorrecta')).toBeFalse();
    expect(service.estaAutenticado()).toBeFalse();
  });
});
